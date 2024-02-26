/* eslint-disable no-unused-vars */
import { getLocales } from 'expo-localization'
import * as Location from 'expo-location'
import React, { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToPostView } from '@routes/auxMethods'
import { HomeScreenProps } from '@routes/Stack/HomeStack/stackScreenProps'
import { FeedPosts, Id, PostCollection, PostRange, PostType } from '@services/firebase/types'
import {
	SearchParams,
	LatLong,
	AddressSearchResult,
	SelectedAddressRender,
	GeocodeAddress,
} from '@services/maps/types'

import { getPostsByLocationCloud } from '@services/cloudFunctions/getPostsByLocationCloud'
import { LocationService } from '@services/location/LocationService'
import { getReverseGeocodeByMapsApi } from '@services/maps/getReverseGeocodeByMapsApi'
import { searchAddressByText } from '@services/maps/searchAddressByText'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { getLastRecentAddress, getRecentAdressesFromStorage } from '@utils/maps/recentAddresses'

import {
	Container,
	DropdownContainer,
	RecentPostsContainer
} from './styles'
import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { AdsCarousel } from '@components/AdsCarousel'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { HomeCatalogMenu } from '@components/HomeCatalogMenu'
import { LocationNearDropdown } from '@components/LocationNearDropdown'
import { RequestLocation } from '@components/RequestLocation'

const { getCurrentLocation, convertGeocodeToAddress } = LocationService()
const { structureAddress, structureExpoLocationAddress } = UiLocationUtils()

const initialSelectedAddress = {
	addressHighlighted: '',
	addressThin: '',
}

const initialFeedPosts = {
	nearby: [],
	city: [],
	country: []
}

function Home({ navigation }: HomeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { locationDataContext, setLocationDataOnContext } = useContext(LocationContext)

	const [selectedAddress, setSelectedAddress] = useState<SelectedAddressRender>(initialSelectedAddress)
	const [recentAddresses, setRecentAddresses] = useState<AddressSearchResult[]>([])
	const [feedPosts, setFeedPosts] = useState<FeedPosts>(initialFeedPosts)
	const [addressSuggestions, setAddressSuggestions] = useState<AddressSearchResult[]>([])
	const [hasLocationPermission, setHasLocationPermission] = useState(false)
	const [hasLocationEnable, setHasLocationEnable] = useState(false)
	const [searchEnded, setSearchEnded] = useState(false)
	const [feedIsUpdating, setFeedIsUpdating] = useState(false)

	const [subscriptionModalIsVisible, setSubscriptionModalIsVisible] = React.useState(false)

	useEffect(() => {
		requestPermissions()
		loadRecentAddresses()
	}, [])

	useEffect(() => {
		if (hasLocationPermission) {
			findFeedPosts('', true, null as any, false, true)
		}
	}, [hasLocationPermission])

	const requestPermissions = async () => {
		if (hasLocationPermission) return true
		const { status } = await Location.requestForegroundPermissionsAsync()
		if (status === 'granted') {
			setHasLocationPermission(true)
			return true
		}
		return false
	}

	const locationIsEnable = async () => {
		const locationEnabled = await Location.hasServicesEnabledAsync()
		setHasLocationEnable(locationEnabled)
		return locationEnabled
	}

	const loadRecentAddresses = async () => {
		const addresses = await getRecentAdressesFromStorage()
		setRecentAddresses(addresses)
	}

	const findFeedPosts = async (
		searchText: string,
		currentPosition?: boolean,
		alternativeCoordinates?: LatLong,
		refresh?: boolean,
		firstLoad?: boolean
	) => {
		if (!hasLocationPermission) return
		locationIsEnable()

		try {
			refresh ? setFeedIsUpdating(true) : setLoaderIsVisible(true)
			setSearchEnded(false)
			let searchParams = {} as SearchParams
			if (currentPosition || !hasLocationPermission) {
				const coordinates = await getCurrentPositionCoordinates(firstLoad)
				searchParams = await getSearchParams(coordinates as LatLong)
			} else {
				const coordinates = alternativeCoordinates || (await getSearchedAddressCoordinates(searchText))
				searchParams = await getSearchParams(coordinates as LatLong)
			}

			const remoteFeedPosts = await getPostsByLocationCloud(
				searchParams,
				userDataContext.userId as Id
			)

			setFeedPosts(remoteFeedPosts || { nearby: [], city: [], country: [] })

			refresh ? setFeedIsUpdating(false) : setLoaderIsVisible(false)
			setSearchEnded(true)
			setLocationDataOnContext({
				searchParams,
				feedPosts: remoteFeedPosts,
				lastRefreshInMilliseconds: Date.now(),
			})
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
			setSearchEnded(true)
		}
	}

	const refreshFeedPosts = async () => {
		console.log('refreshing feed...')
		await findFeedPosts('', false, locationDataContext.searchParams.coordinates || null, true)
	}

	const getCurrentPositionCoordinates = async (firstLoad?: boolean) => {
		try {
			if (firstLoad) {
				const recentPosition = getLastRecentAddress(recentAddresses)

				if (recentPosition) {
					return {
						lat: recentPosition.lat,
						lon: recentPosition.lon,
					} as LatLong
				}
			}

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
		const geocodeAddress = await checkLanguageAndConvertGeocodeToAddress(coordinates.lat, coordinates.lon)

		const deviceLanguage = getLocales()[0].languageCode

		const structuredAddress = deviceLanguage === 'pt'
			? structureExpoLocationAddress(geocodeAddress as Location.LocationGeocodedAddress[], coordinates.lat, coordinates.lon)
			: structureAddress(geocodeAddress as GeocodeAddress, coordinates.lat, coordinates.lon)

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

	const checkLanguageAndConvertGeocodeToAddress = async (latitude: number, longitude: number) => {
		const deviceLanguage = getLocales()[0].languageCode

		if (deviceLanguage === 'pt') { // change structure Function
			const geocodeAddress = await convertGeocodeToAddress(latitude, longitude)
			return geocodeAddress
		}

		const geocodeAddress = await getReverseGeocodeByMapsApi(latitude, longitude)
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

	const viewPostDetails = (postData: PostCollection) => {
		navigateToPostView(postData, navigation as any, 'Home') // TODO Type
	}

	const navigateToPostCategories = (postType: PostType) => {
		if (!hasAnyPost()) return
		setLocationDataOnContext({
			searchParams: { ...locationDataContext.searchParams, postType }
		})

		navigation.navigate('ViewPostsByPostType', { postType })
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any) // TODO Type
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const rangeConfig = {
			near: { postsByRange: feedPosts.nearby, postRange: 'near' as PostRange },
			city: { postsByRange: feedPosts.city, postRange: 'city' as PostRange },
			country: { postsByRange: feedPosts.country, postRange: 'country' as PostRange }
		}
		navigation.navigate('ViewPostsByRange', { ...rangeConfig[postRange], searchByRange: true })
	}

	const hasAnyPost = () => {
		return feedPosts.nearby.length > 0 || feedPosts.city.length > 0 || feedPosts.country.length > 0
	}

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('SelectSubscriptionRange')
	}

	const navigateToEditUserLocation = () => {
		navigation.navigate('EditProfile', { user: userDataContext })
	}

	const navigateToPublicServices = () => {
		navigation.navigate('PublicServicesStack')
	}

	const userHasPaidSubscription = () => {
		return (userDataContext.subscription && userDataContext.subscription.subscriptionRange !== 'near')
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<Container>
			<FocusAwareStatusBar
				backgroundColor={theme.orange2}
				barStyle={'dark-content'}
			/>
			<SubscriptionPresentationModal
				visibility={subscriptionModalIsVisible}
				profilePictureUri={profilePictureUrl}
				closeModal={() => setSubscriptionModalIsVisible(false)}
				onPressButton={navigateToSelectSubscriptionRange}
			/>
			<DropdownContainer>
				<LocationNearDropdown
					selectedAddress={selectedAddress}
					recentAddresses={recentAddresses}
					addressSuggestions={addressSuggestions}
					selectAddress={setSelectedAddress}
					saveRecentAddresses={saveRecentAddresses}
					clearAddressSuggestions={clearAddressSuggestions}
					findNearPosts={findFeedPosts}
					findAddressSuggestions={findAddressSuggestions}
				/>
			</DropdownContainer>
			<HomeCatalogMenu navigateToScreen={navigateToPostCategories} />
			<RecentPostsContainer
				showsVerticalScrollIndicator={false}
				refreshControl={(
					<RefreshControl
						colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
						refreshing={feedIsUpdating}
						progressBackgroundColor={theme.white3}
						onRefresh={refreshFeedPosts}
					/>
				)}
			>
				<AdsCarousel
					onPressCorreAd={() => !userHasPaidSubscription() && setSubscriptionModalIsVisible(true)}
					onPressUserLocationAd={navigateToEditUserLocation}
					onPressPublicServicesAd={navigateToPublicServices}
				/>
				{!hasLocationEnable && !hasAnyPost() && searchEnded && (
					<RequestLocation
						getLocationPermissions={() => {
							requestPermissions()
							findFeedPosts('', true)
						}}
					/>
				)}
				<FeedByRange
					searchEnded={searchEnded}
					backgroundColor={theme.orange2}
					filteredFeedPosts={feedPosts}
					viewPostsByRange={viewPostsByRange}
					navigateToProfile={navigateToProfile}
					goToPostView={viewPostDetails}
				/>
			</RecentPostsContainer>
		</Container>
	)
}

export { Home }
