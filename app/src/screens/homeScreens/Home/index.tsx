import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, FlatList, RefreshControl } from 'react-native'
import * as Location from 'expo-location'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	Container,
	DropdownContainer,
	FooterSigh,
	HorizontalPostTypes,
	RecentPostsContainer,
	Sigh
} from './styles'
import { theme } from '../../../common/theme'
import SocialImpactIcon from '../../../assets/icons/socialImpact-filled.svg'
import SaleIcon from '../../../assets/icons/sale-filled.svg'
import CultureIcon from '../../../assets/icons/culture-filled.svg'
import ServiceIcon from '../../../assets/icons/service-filled.svg'
import VacancyIcon from '../../../assets/icons/vacancy-filled.svg'

import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { searchAddressByText } from '../../../services/maps/searchAddressByText'
import { structureAddress } from '../../../services/maps/addressFormatter'
import { getRecentAddressFromStorage } from '../../../services/maps/recentAddresses'
import { getPostsByLocationCloud } from '../../../services/cloudFunctions/getPostsByLocationCloud'
// import { getPostsByLocation } from '../../../services/firebase/post/getPostsByLocation'

import { SearchParams, LatLong, AddressSearchResult, SelectedAddressRender } from '../../../services/maps/types'
import { Id, PostCollection, PostType } from '../../../services/firebase/types'
import { HomeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { LocationNearDropdown } from '../../../components/LocationNearDropdown'
import { PostCard } from '../../../components/_cards/PostCard'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { RequestLocation } from '../../../components/RequestLocation'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'

const initialSelectedAddress = {
	addressHighlighted: '',
	addressThin: ''
}

function Home({ navigation }: HomeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [selectedAddress, setSelectedAddress] = useState<SelectedAddressRender>(initialSelectedAddress)
	const [recentAddresses, setRecentAddresses] = useState<AddressSearchResult[]>([])
	const [nearPosts, setNearPosts] = useState<PostCollection[]>([])
	const [addressSuggestions, setAddressSuggestions] = useState<AddressSearchResult[]>([])
	const [hasLocationPermission, setHasLocationPermission] = useState(false)
	const [hasLocationEnable, setHasLocationEnable] = useState(false)
	const [searchEnded, setSearchEnded] = useState(false)
	const [flatListIsLoading, setFlatListIsLoading] = useState(false)

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
		locationIsEnable()
	})

	/* useEffect(() => { //Reload location on back to screen
		navigation.addListener('focus', () => {
			findNearPosts('', true)
		})
	}, [navigation]) */

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		}
		return false
	}

	useEffect(() => {
		requestPermissions()
		getRecentAddresses()
	}, [])

	useEffect(() => {
		findNearPosts('', true)
	}, [hasLocationPermission])

	const requestPermissions = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status === 'granted') {
			setHasLocationPermission(true)
		}
	}

	const locationIsEnable = async () => {
		const locationEnabled = await Location.hasServicesEnabledAsync()
		setHasLocationEnable(locationEnabled)
		return locationEnabled
	}

	const getRecentAddresses = async () => {
		const addresses = await getRecentAddressFromStorage()
		setRecentAddresses(addresses)
	}

	const findNearPosts = async (searchText: string, currentPosition?: boolean, alternativeCoordinates?: LatLong, refresh?: boolean) => {
		if (!locationIsEnable) return

		try {
			refresh ? setFlatListIsLoading(true) : setLoaderIsVisible(true); setSearchEnded(false)

			let searchParams = {} as SearchParams
			if (currentPosition) {
				const coordinates = await getCurrentPositionCoordinates()
				searchParams = await getSearchParams(coordinates)
			} else {
				const coordinates = alternativeCoordinates || await getSearchedAddressCoordinates(searchText)
				searchParams = await getSearchParams(coordinates as LatLong) // address converter
			}

			const nearbyPosts = await getPostsByLocationCloud(searchParams, userDataContext.userId as Id)
			// const nearbyPosts = await getPostsByLocation(searchParams)
			setNearPosts(nearbyPosts || [])

			refresh ? setFlatListIsLoading(false) : setLoaderIsVisible(false); setSearchEnded(true)
			setLocationDataOnContext({ searchParams, nearbyPosts, lastRefreshInMilliseconds: Date.now() })
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			setSearchEnded(true)
		}
	}

	const refreshFlatlist = async () => {
		await findNearPosts('', false, locationDataContext.searchParams.coordinates || null, true)
	}

	const getCurrentPositionCoordinates = async () => {
		const currentPositionCoordinate = await Location.getCurrentPositionAsync()

		return {
			lat: currentPositionCoordinate.coords.latitude,
			lon: currentPositionCoordinate.coords.longitude
		} as LatLong
	}

	const getSearchedAddressCoordinates = async (searchText: string) => {
		const addressGeolocation = await Location.geocodeAsync(searchText)
		if (!addressGeolocation.length) {
			console.log('invalid text address')
			return false
		}
		return {
			lat: addressGeolocation[0].latitude,
			lon: addressGeolocation[0].longitude,
		} as LatLong
	}

	const getSearchParams = async (coordinates: LatLong) => {
		const address = await convertGeocodeToAddress(coordinates.lat, coordinates.lon)
		const structuredAddress = structureAddress(address)
		const geohashObject = generateGeohashes(coordinates.lat, coordinates.lon)

		setSelectedAddress({
			addressHighlighted: `${structuredAddress.street}, ${structuredAddress.number} - ${structuredAddress.district}`,
			addressThin: `${structuredAddress.city} - ${structuredAddress.state}, ${structuredAddress.postalCode}`
		})

		return {
			range: 'nearby',
			city: structuredAddress.city,
			country: structuredAddress.country,
			postType: 'service',
			coordinates,
			geohashes: geohashObject.geohashNearby,

		} as SearchParams
	}

	const convertGeocodeToAddress = async (latitude: number, longitude: number) => {
		const geocodeAddress = await Location.reverseGeocodeAsync({
			latitude,
			longitude
		})
		return geocodeAddress
	}

	const findAddressSuggestions = async (searchText: string) => {
		try {
			setLoaderIsVisible(true)
			const addresses = await searchAddressByText(searchText, true)
			setAddressSuggestions(addresses)
			setLoaderIsVisible(false)
		} catch (err) {
			setLoaderIsVisible(false)
		}
	}

	const clearAddressSuggestions = () => {
		setAddressSuggestions([])
	}

	const saveRecentAddresses = (newAddress: AddressSearchResult) => {
		const filtredRecentAddress = recentAddresses.filter((address) => address.formattedAddress !== newAddress.formattedAddress)
		setRecentAddresses([{ ...newAddress, recent: true }, ...filtredRecentAddress])
	}

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePostHome', { postData: { ...item } })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePostHome', { postData: { ...item } })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPostHome', { postData: { ...item } })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostHome', { postData: { ...item } })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostHome', { postData: { ...item } })
				break
			}
			default: return false
		}
	}

	const navigateToPostCategories = (postType: PostType) => {
		navigation.navigate('PostCategories', { postType })
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId })
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DropdownContainer>
				<LocationNearDropdown
					selectedAddress={selectedAddress}
					recentAddresses={recentAddresses}
					addressSuggestions={addressSuggestions}
					selectAddress={setSelectedAddress}
					saveRecentAddresses={saveRecentAddresses}
					clearAddressSuggestions={clearAddressSuggestions}
					findNearPosts={findNearPosts}
					findAddressSuggestions={findAddressSuggestions}
				/>
			</DropdownContainer>
			<HorizontalPostTypes>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToPostCategories('socialImpact')}
					label={'impacto'}
					SvgIcon={SocialImpactIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToPostCategories('sale')}
					label={'comércio'}
					SvgIcon={SaleIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToPostCategories('culture')}
					label={'cultura'}
					SvgIcon={CultureIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToPostCategories('service')}
					label={'serviços'}
					SvgIcon={ServiceIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToPostCategories('vacancy')}
					label={'vagas'}
					SvgIcon={VacancyIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
			</HorizontalPostTypes>
			<RecentPostsContainer>
				<SubtitleCard
					text={'posts de recentes'}
					highlightedText={['recentes']}
					onPress={() => { }}
				/>
				{
					(!hasLocationEnable && !nearPosts.length) && (
						<RequestLocation getLocationPermissions={() => {
							requestPermissions()
							findNearPosts('', true)
						}}
						/>
					)
				}
				{
					nearPosts.length
						? (
							<FlatList
								data={nearPosts}
								renderItem={({ item }) => (
									<PostCard
										post={item}
										owner={item.owner}
										navigateToProfile={navigateToProfile}
										onPress={() => goToPostView(item)}
									/>
								)}
								// onEndReached={() => console.log('findMoreNearPosts(Pagination)')}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ padding: RFValue(10), paddingTop: flatListIsLoading ? relativeScreenHeight(10) : RFValue(10) }}
								ItemSeparatorComponent={() => <Sigh />}
								ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
								ListFooterComponent={<FooterSigh />}
								refreshControl={(
									<RefreshControl
										colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3, theme.purple3, theme.yellow3, theme.red3]}
										refreshing={flatListIsLoading}
										progressBackgroundColor={theme.white3}
										onRefresh={refreshFlatlist}
									/>
								)}
							/>
						)
						: hasLocationEnable && searchEnded && (
							<WithoutPostsMessage
								title={'opa!'}
								message={'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'}
							/>
						)
				}
			</RecentPostsContainer>
		</Container >
	)
}

export { Home }
