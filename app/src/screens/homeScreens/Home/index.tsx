import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, FlatList, StatusBar } from 'react-native'
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
import HeartPinkIcon from '../../../assets/icons/heart-pink.svg'
import SalesCartIcon from '../../../assets/icons/salesCart-green.svg'
import SoundToolsIcon from '../../../assets/icons/soundTools-blue.svg'
import ToolBoxIcon from '../../../assets/icons/toolBox-purple.svg'
import SuitcaseIcon from '../../../assets/icons/suitcase-yellow.svg'
import { relativeScreenWidth } from '../../../common/screenDimensions'

import { getListOfPosts } from '../../../services/firebase/post/getListOfPosts'
import { generateGeohashes } from '../../../common/generateGeohashes'
import { searchAddressByText } from '../../../services/maps/searchAddressByText'
import { structureAddress } from '../../../services/maps/addressFormatter'
import { getRecentAddressFromStorage } from '../../../services/maps/recentAddresses'

import { SearchParams, LatLong, AddressSearchResult, SelectedAddressRender } from '../../../services/maps/types'
import { PostCollection } from '../../../services/firebase/types'
import { HomeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'
import { LocationData } from '../../../contexts/types'

import { LocationContext } from '../../../contexts/LocationContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { LocationNearDropdown } from '../../../components/LocationNearDropdown'
import { PostCard } from '../../../components/_cards/PostCard'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { RequestLocation } from '../../../components/RequestLocation'
import { getPostsByLocation } from '../../../services/firebase/post/getPostsByLocation'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { getPostsByDeliveryMethod } from '../../../services/firebase/post/getPostsByDeliveryMethod'

const initialSelectedAddress = {
	addressHighlighted: '',
	addressThin: ''
}

function Home({ navigation }: HomeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { setLocationDataOnContext } = useContext(LocationContext)

	const [selectedAddress, setSelectedAddress] = useState<SelectedAddressRender>(initialSelectedAddress)
	const [recentAddresses, setRecentAddresses] = useState<AddressSearchResult[]>([])
	const [nearPosts, setNearPosts] = useState<PostCollection[]>([])
	const [addressSuggestions, setAddressSuggestions] = useState<AddressSearchResult[]>([])
	const [hasLocationPermission, setHasLocationPermission] = useState(false)
	const [hasLocationEnable, setHasLocationEnable] = useState(false)
	const [searchEnded, setSearchEnded] = useState(false)

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
	}, [])

	useEffect(() => {
		getRecentAddresses()
		findNearPosts('', true)
	}, [hasLocationPermission])

	const requestPermissions = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			setHasLocationPermission(true)
		}
	}

	const locationIsEnable = async () => {
		const locationEnabled = await Location.hasServicesEnabledAsync()
		setHasLocationEnable(locationEnabled)
	}

	const getRecentAddresses = async () => {
		const addresses = await getRecentAddressFromStorage()
		setRecentAddresses(addresses)
	}

	const findNearPosts = async (searchText: string, currentPosition?: boolean, alternativeCoordinates?: LatLong) => { // TODO Type
		try {
			setSearchEnded(false)
			setLoaderIsVisible(true)
			let searchParams = {} as LocationData
			if (currentPosition) {
				const coordinates = await getCurrentPositionCoordinates()
				searchParams = await getSearchParams(coordinates)
			} else {
				const coordinates = alternativeCoordinates || await getSearchedAddressCoordinates(searchText)
				searchParams = await getSearchParams(coordinates as LatLong) // address converter
			}

			const postsIds = await getPostsByLocation(searchParams as SearchParams)
			const posts = await getListOfPosts(postsIds)
			const listOfPosts = [].concat(...posts as any) || []// TODO type
			const postsDelivery = await getPostsByDeliveryMethod(searchParams)

			setNearPosts([].concat(...posts as any) || [])
			setLoaderIsVisible(false)
			setSearchEnded(true)
			setLocationDataOnContext(searchParams)
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			setSearchEnded(true)
		}
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
			postType: 'any',
			geohashes: geohashObject.geohashNearby
		} as LocationData
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
				navigation.navigate('ViewServicePostHome' as any, { postData: { ...item } })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePostHome' as any, { postData: { ...item } })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPostHome' as any, { postData: { ...item } })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostHome' as any, { postData: { ...item } })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostHome' as any, { postData: { ...item } })
				break
			}
			default: return false
		}
	}

	const navigateToPostCategories = (title: string) => {
		navigation.navigate('PostCategories', { title })
	}

	const navigateToProfile = (userId: string) => {
		console.log(userDataContext.userId === userId)
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)// TODO Type
			return
		}
		navigation.navigate('ProfileHome' as any, { userId })// TODO Type
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
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
					fontSize={8}
					onPress={() => navigateToPostCategories('impacto social')}
					label={'impacto'}
					SvgIcon={HeartPinkIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={8}
					onPress={() => navigateToPostCategories('comércio')}
					label={'comércio'}
					SvgIcon={SalesCartIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={8}
					onPress={() => navigateToPostCategories('culturas')}
					label={'cultura'}
					SvgIcon={SoundToolsIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={8}
					onPress={() => navigateToPostCategories('serviços')}
					label={'serviços'}
					SvgIcon={ToolBoxIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={8}
					onPress={() => navigateToPostCategories('vagas')}
					label={'vagas'}
					SvgIcon={SuitcaseIcon}
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
					(!hasLocationEnable) && (
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
										onPress={() => goToPostView(item)}// TODO structure
									/>
								)}
								onEndReached={() => console.log('findMoreNearPosts(Pagination)')}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ padding: RFValue(10) }}
								ItemSeparatorComponent={() => <Sigh />}
								ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
								ListFooterComponent={<FooterSigh />}
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
