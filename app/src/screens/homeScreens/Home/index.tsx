import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, FlatList, RefreshControl } from 'react-native'
import * as Location from 'expo-location'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	Container,
	DropdownContainer,
	RecentPostsContainer
} from './styles'
import { theme } from '../../../common/theme'

import {
	relativeScreenHeight,
	relativeScreenWidth,
} from '../../../common/screenDimensions'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { searchAddressByText } from '../../../services/maps/searchAddressByText'
import { structureAddress } from '../../../utils/maps/addressFormatter'
import { getLastRecentAddress, getRecentAdressesFromStorage } from '../../../utils/maps/recentAddresses'
import { getPostsByLocationCloud } from '../../../services/cloudFunctions/getPostsByLocationCloud'
import { getPostsByLocation } from '../../../services/firebase/post/getPostsByLocation'
import { getCurrentLocation } from '../../../utils/maps/getCurrentLocation'

import {
	SearchParams,
	LatLong,
	AddressSearchResult,
	SelectedAddressRender,
} from '../../../services/maps/types'
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
import { HomeCatalogMenu } from '../../../components/HomeCatalogMenu'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { FlatListPosts } from '../../../components/FlatListPosts'

const initialSelectedAddress = {
	addressHighlighted: '',
	addressThin: '',
}

const initialNearPosts = {
	nearby: [],
	city: [],
	country: []
}

type NearPosts = {
	nearby: PostCollection[],
	city: PostCollection[],
	country: PostCollection[],
}

function Home({ navigation }: HomeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [selectedAddress, setSelectedAddress] = useState<SelectedAddressRender>(initialSelectedAddress)
	const [recentAddresses, setRecentAddresses] = useState<AddressSearchResult[]>([])
	const [nearPosts, setNearPosts] = useState<NearPosts>(initialNearPosts)
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

	const requestPermissions = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status === 'granted') {
			setHasLocationPermission(true)
		}
	}

	useEffect(() => {
		if (hasLocationPermission) {
			findNearPosts('', true, null as any, false, true)
		}
	}, [hasLocationPermission])

	const locationIsEnable = async () => {
		const locationEnabled = await Location.hasServicesEnabledAsync()
		setHasLocationEnable(locationEnabled)
		return locationEnabled
	}

	const getRecentAddresses = async () => {
		const addresses = await getRecentAdressesFromStorage()
		// addresses.forEach((address) => console.log(address), console.log('\n\n'))
		setRecentAddresses(addresses)
	}

	const findNearPosts = async (
		searchText: string,
		currentPosition?: boolean,
		alternativeCoordinates?: LatLong,
		refresh?: boolean,
		firstLoad?: boolean
	) => {
		if (!hasLocationPermission) return requestPermissions()

		try {
			refresh ? setFlatListIsLoading(true) : setLoaderIsVisible(true)
			setSearchEnded(false)
			let searchParams = {} as SearchParams
			if (currentPosition) {
				const coordinates = await getCurrentPositionCoordinates(firstLoad)
				searchParams = await getSearchParams(coordinates as LatLong)
			} else {
				const coordinates = alternativeCoordinates || (await getSearchedAddressCoordinates(searchText))
				searchParams = await getSearchParams(coordinates as LatLong) // address converter
			}

			/* const nearbyPosts = await getPostsByLocationCloud(
				searchParams,
				userDataContext.userId as Id
			) */

			const nearbyPosts = await getPostsByLocation(searchParams)

			/* console.log(nearbyPosts.nearby.map((post: any) => post.title))
			console.log('----------------------------------------------------------------------------------------')
			console.log(nearbyPosts.city.map((post: any) => post.title))
			console.log('----------------------------------------------------------------------------------------')
			console.log(nearbyPosts.country.map((post: any) => post.title))
			console.log('----------------------------------------------------------------------------------------') */

			setNearPosts(nearbyPosts || { nearby: [], city: [], country: [] })

			refresh ? setFlatListIsLoading(false) : setLoaderIsVisible(false)
			setSearchEnded(true)
			/* setLocationDataOnContext({
				searchParams,
				nearbyPosts,
				lastRefreshInMilliseconds: Date.now(),
			}) */
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			setSearchEnded(true)
		}
	}

	const refreshFlatlist = async () => {
		await findNearPosts(
			'',
			false,
			locationDataContext.searchParams.coordinates || null,
			true
		)
	}

	const getCurrentPositionCoordinates = async (firstLoad?: boolean) => {
		try {
			const currentPosition: Location.LocationObject = await getCurrentLocation()

			return {
				lat: currentPosition.coords.latitude,
				lon: currentPosition.coords.longitude
			} as LatLong
		} catch (error) {
			console.log(error)

			const recentPosition = getLastRecentAddress(recentAddresses)
			if (!recentPosition) {
				return null
			}

			return {
				lat: recentPosition.lat,
				lon: recentPosition.lon,
			} as LatLong
		}
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
		const address = await convertGeocodeToAddress(
			coordinates.lat,
			coordinates.lon
		)
		const structuredAddress = structureAddress(address)
		const geohashObject = generateGeohashes(
			coordinates.lat,
			coordinates.lon
		)

		setSelectedAddress({
			addressHighlighted: `${structuredAddress.street}, ${structuredAddress.number} - ${structuredAddress.district}`,
			addressThin: `${structuredAddress.city} - ${structuredAddress.state}, ${structuredAddress.postalCode}`,
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

	const convertGeocodeToAddress = async (
		latitude: number,
		longitude: number
	) => {
		const geocodeAddress = await Location.reverseGeocodeAsync({
			latitude,
			longitude,
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
		setRecentAddresses([
			{ ...newAddress, recent: true },
			...filtredRecentAddress,
		])
	}

	const goToPostView = (item: PostCollection) => {
		switch (item.postType) {
			case 'service': {
				navigation.navigate('ViewServicePostHome', {
					postData: { ...item },
				})
				break
			}
			case 'sale': {
				navigation.navigate('ViewSalePostHome', {
					postData: { ...item },
				})
				break
			}
			case 'vacancy': {
				navigation.navigate('ViewVacancyPostHome', {
					postData: { ...item },
				})
				break
			}
			case 'socialImpact': {
				navigation.navigate('ViewSocialImpactPostHome', {
					postData: { ...item },
				})
				break
			}
			case 'culture': {
				navigation.navigate('ViewCulturePostHome', {
					postData: { ...item },
				})
				break
			}
			default:
				return false
		}
	}

	const navigateToPostCategories = (postType: PostType) => {
		navigation.navigate('PostCategories', { postType })
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any) // TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	return (
		<Container>
			<FocusAwareStatusBar
				backgroundColor={theme.orange2}
				barStyle={'dark-content'}
			/>
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
			<HomeCatalogMenu navigateToScreen={navigateToPostCategories} />
			<RecentPostsContainer>
				{/* {!hasLocationEnable && !nearPosts.length && ( // UNCOMENT
					<RequestLocation
						getLocationPermissions={() => {
							requestPermissions()
							findNearPosts('', true)
						}}
					/>
				)} */}
				{
					(nearPosts.nearby && nearPosts.nearby.length)
						? (
							<>
								<SubtitleCard
									text={'perto de você'}
									highlightedText={['perto']}
									onPress={() => { }}
								/>
								<FlatListPosts
									data={nearPosts.nearby}
									renderItem={(item) => (
										<PostCard
											post={item}
											owner={item.owner}
											navigateToProfile={navigateToProfile}
											onPress={() => goToPostView(item)}
										/>
									)}
									flatListIsLoading={flatListIsLoading}
									onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				{
					(nearPosts.city && nearPosts.city.length)
						? (
							<>
								<SubtitleCard
									text={'na cidade'}
									highlightedText={['cidade']}
									onPress={() => { }}
								/>
								<FlatListPosts
									data={nearPosts.city}
									renderItem={(item) => (
										<PostCard
											post={item}
											owner={item.owner}
											navigateToProfile={navigateToProfile}
											onPress={() => goToPostView(item)}
										/>
									)}
									flatListIsLoading={flatListIsLoading}
									onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				{
					(nearPosts.country && nearPosts.country.length)
						? (
							<>
								<SubtitleCard
									text={'no país'}
									highlightedText={['país']}
									onPress={() => { }}
								/>
								<FlatListPosts
									data={nearPosts.country}
									renderItem={(item) => (
										<PostCard
											post={item}
											owner={item.owner}
											navigateToProfile={navigateToProfile}
											onPress={() => goToPostView(item)}
										/>
									)}
									flatListIsLoading={flatListIsLoading}
									onEndReached={refreshFlatlist}
								/>
							</>
						)
						: <></>
				}
				{
					hasLocationEnable && searchEnded && (
						<WithoutPostsMessage
							title={'opa!'}
							message={
								'parece que não temos nenhum post perto de você, nosso time já está sabendo e irá resolver!'
							}
						/>
					)
				}
			</RecentPostsContainer>
		</Container>
	)
}

export { Home }
