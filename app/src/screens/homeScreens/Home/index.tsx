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
	RecentPostsHeader,
	Sigh,
	Title
} from './styles'
import { theme } from '../../../common/theme'
import HeartPinkIcon from '../../../assets/icons/heart-pink.svg'
import SalesCartIcon from '../../../assets/icons/salesCart-green.svg'
import SoundToolsIcon from '../../../assets/icons/soundTools-blue.svg'
import ToolBoxIcon from '../../../assets/icons/toolBox-purple.svg'
import SuitcaseIcon from '../../../assets/icons/suitcase-yellow.svg'
import AngleRightIcon from '../../../assets/icons/angleRight-shadow.svg'
import { screenWidth } from '../../../common/screenDimensions'

import { searchPosts } from '../../../services/algolia/searchPost'
import { getListOfPosts } from '../../../services/firebase/post/getListOfPosts'
import { generateGeohashes } from '../../../common/generateGeohashes'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { searchAddressByText } from '../../../services/maps/searchAddressByText'
import { structureAddress } from '../../../services/maps/addressFormatter'
import { getRecentAddressFromStorage } from '../../../services/maps/recentAddresses'

import { AlgoliaSearchParams, LatLong, AddressSearchResult, SelectedAddressRender } from '../../../services/maps/types'
import { PostCollection } from '../../../services/firebase/types'
import { HomeTabScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { LocationNearDropdown } from '../../../components/LocationNearDropdown'
import { PostCard } from '../../../components/_cards/PostCard'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { RequestLocation } from '../../../components/RequestLocation'
import { LoaderContext } from '../../../contexts/LoaderContext'
import { getPostsByLocation } from '../../../services/firebase/post/getPostsByLocation'

const initialSelectedAddress = {
	addressHighlighted: '',
	addressThin: ''
}

function Home({ navigation }: HomeTabScreenProps) {
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [selectedAddress, setSelectedAddress] = useState<SelectedAddressRender>(initialSelectedAddress)
	const [recentAddresses, setRecentAddresses] = useState<AddressSearchResult[]>([])
	const [nearPosts, setNearPosts] = useState<PostCollection[]>([])
	const [addressSuggestions, setAddressSuggestions] = useState<AddressSearchResult[]>([])
	const [hasLocationPermission, setHasLocationPermission] = useState(false)
	const [hasLocationEnable, setHasLocationEnable] = useState(false)

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
		locationIsEnable()
	})

	useEffect(() => {
		navigation.addListener('focus', () => {
			findNearPosts('', true)
		})
	}, [navigation])

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
		setHasLocationPermission(true)
		if (status !== 'granted') {
			console.log('Permission to access location was denied')
			console.log(status)
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
			setLoaderIsVisible(true)
			let searchParams = {}
			if (currentPosition) {
				const coordinates = await getCurrentPositionCoordinates()
				searchParams = await getSearchParams(coordinates)
			} else {
				const coordinates = alternativeCoordinates || await getSearchedAddressCoordinates(searchText)
				searchParams = await getSearchParams(coordinates as LatLong) // address converter
			}

			const postsIds = await getPostsByLocation(searchParams as AlgoliaSearchParams)
			const posts = await getListOfPosts(postsIds)
			setNearPosts(posts[0] as any) // TODO type
			setLoaderIsVisible(false)
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
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
		} as AlgoliaSearchParams
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
			console.log('deu ruim')
			setLoaderIsVisible(false)
		}
	}

	const clearAddressSuggestions = () => {
		setAddressSuggestions([])
	}

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePost' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePost' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPost' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPost' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePost' as any, { postData: { ...item }, isAuthor: false })
				break
			}
			default: return false
		}
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
					clearAddressSuggestions={clearAddressSuggestions}
					findNearPosts={findNearPosts}
					findAddressSuggestions={findAddressSuggestions}
				/>
			</DropdownContainer>
			<HorizontalPostTypes>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => findNearPosts('')}
					label={'impacto'}
					SvgIcon={HeartPinkIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={SalesCartIcon}
					svgScale={30}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={SoundToolsIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={ToolBoxIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={screenWidth * 0.13}
					color={'white'}
					fontSize={8}
					onPress={() => { }}
					label={'impacto'}
					SvgIcon={SuitcaseIcon}
					svgScale={35}
					height={screenWidth * 0.13}
					flexDirection={'column'}
				/>
			</HorizontalPostTypes>
			<RecentPostsContainer>
				<RecentPostsHeader onPress={() => { }}>
					<Title>{showMessageWithHighlight('posts de recentes', ['recentes'])}</Title>
					<AngleRightIcon width={RFValue(20)} height={RFValue(20)} />
				</RecentPostsHeader>
				{
					(!hasLocationEnable) && (
						<RequestLocation getLocationPermissions={() => findNearPosts('', true)} />
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
										onPress={() => goToPostView(item)}// TODO structure
									/>
								)}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ padding: RFValue(10) }}
								ItemSeparatorComponent={() => <Sigh />}
								ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
								ListFooterComponent={<FooterSigh />}
							/>
						)
						: null
				}
			</RecentPostsContainer>
		</Container >
	)
}

export { Home }
