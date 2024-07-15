import { getLocales } from 'expo-localization'
import * as Location from 'expo-location'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { useQueryClient } from '@tanstack/react-query'

import { PetitionEntity } from '@domain/petition/entity/types'
import { PollEntity } from '@domain/poll/entity/types'
import { FeedPosts, LatLong, PostEntityOptional, PostRange, PostType } from '@domain/post/entity/types'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { useLocationRepository } from '@data/application/location/useLocationRepository'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'
import { LocationContext } from '@contexts/LocationContext'

import { navigateToLeaderPostsView, navigateToPostView } from '@routes/auxMethods'
import { HomeScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { FeedSearchParams } from '@services/cloudFunctions/types/types'
import { AddressSearchResult, SelectedAddressRender, GeocodeAddress } from '@services/googleMaps/types/maps'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'
import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { getMostRecentAddress } from '@utils/maps/recentAddresses'

import { Container, DropdownContainer } from './styles'
import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { AdsCarousel } from '@components/AdsCarousel'
import { FeedByRange } from '@components/FeedByRange'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { HomeCatalogMenu } from '@components/HomeCatalogMenu'
import { LocationNearDropdown } from '@components/LocationNearDropdown'
import { RequestLocation } from '@components/RequestLocation'

const { getPostsByLocationCloud } = useCloudFunctionService()
const { localStorage } = useLocationRepository()
const { getCurrentLocation, convertGeocodeToAddress } = useLocationService()
const { searchAddressByText, getReverseGeocodeByMapsApi } = useGoogleMapsService()
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

	const queryClient = useQueryClient()
	const { executeCachedRequest } = useCacheRepository()

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
		const addresses = await localStorage.getRecentAddresses()
		setRecentAddresses(addresses)
	}

	const findFeedPosts = async (
		searchText: string,
		currentPosition?: boolean,
		alternativeCoordinates?: LatLong,
		refresh?: boolean,
		firstLoad?: boolean
	) => {
		locationIsEnable()

		try {
			refresh ? setFeedIsUpdating(true) : setLoaderIsVisible(true)
			setSearchEnded(false)
			let searchParams = {}
			if (currentPosition || !hasLocationPermission) {
				const coordinates = await getCurrentPositionCoordinates(firstLoad)
				searchParams = await getSearchParams(coordinates as LatLong)
			} else {
				const coordinates = alternativeCoordinates || (await getSearchedAddressCoordinates(searchText))
				searchParams = await getSearchParams(coordinates as LatLong)
			}

			searchParams = { ...searchParams, searchLeaderPosts: true }

			const { userId } = userDataContext
			const queryKey = ['home.feed', searchParams, userId]
			const remoteFeedPosts = await executeCachedRequest(
				queryClient,
				queryKey,
				() => getPostsByLocationCloud(searchParams as FeedSearchParams, userId),
				refresh
			)

			/* console.log('--------------------------------------')
			console.log('NEAR')
			remoteFeedPosts?.nearby.map((poll: PollEntity | PostEntity | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
			console.log('CITY')
			remoteFeedPosts?.city.map((poll: PollEntity | PostEntity | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
			console.log('COUNTRY')
			remoteFeedPosts?.country.map((poll: PollEntity | PostEntity | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
			console.log('--------------------------------------')
 */
			setFeedPosts(remoteFeedPosts || { nearby: [], city: [], country: [] })

			refresh ? setFeedIsUpdating(false) : setLoaderIsVisible(false)
			setSearchEnded(true)
			setLocationDataOnContext({
				searchParams: searchParams as FeedSearchParams,
				feedPosts: remoteFeedPosts, // Mandar só postagens e deixar as enquetes e abaixos
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
		await findFeedPosts('', false, locationDataContext.searchParams?.coordinates || null as any, true)
	}

	const getCurrentPositionCoordinates = async (firstLoad?: boolean) => {
		try {
			if (firstLoad) {
				const recentPosition = getMostRecentAddress(recentAddresses)

				if (recentPosition) {
					return {
						latitude: recentPosition.lat,
						longitude: recentPosition.lon,
					}
				}
			}

			const currentPosition: Location.LocationObject = await getCurrentLocation()
			return {
				latitude: currentPosition.coords.latitude,
				longitude: currentPosition.coords.longitude
			}
		} catch (error) {
			console.log(error)

			const recentPosition = getMostRecentAddress(recentAddresses)
			if (!recentPosition) {
				return null
			}

			return {
				latitude: recentPosition.lat,
				longitude: recentPosition.lon,
			}
		}
	}

	const getSearchedAddressCoordinates = async (searchText: string) => {
		const addressGeolocation = await Location.geocodeAsync(searchText)
		if (!addressGeolocation.length) {
			console.log('invalid text address')
			return false
		}
		return {
			latitude: addressGeolocation[0].latitude,
			longitude: addressGeolocation[0].longitude,
		} as LatLong
	}

	const getSearchParams = async (coordinates: LatLong) => {
		const geocodeAddress = await checkLanguageAndConvertGeocodeToAddress(coordinates.latitude, coordinates.longitude)

		const deviceLanguage = getLocales()[0].languageCode

		const structuredAddress = deviceLanguage === 'pt'
			? structureExpoLocationAddress(geocodeAddress as Location.LocationGeocodedAddress[], coordinates.latitude, coordinates.longitude)
			: structureAddress(geocodeAddress as GeocodeAddress, coordinates.latitude, coordinates.longitude)

		const geohashObject = generateGeohashes(coordinates.latitude, coordinates.longitude)

		setSelectedAddress({
			addressHighlighted: `${structuredAddress.street}, ${structuredAddress.number} - ${structuredAddress.district}`,
			addressThin: `${structuredAddress.city} - ${structuredAddress.state}, ${structuredAddress.postalCode}`,
		})

		return {
			city: structuredAddress.city,
			country: structuredAddress.country,
			coordinates,
			geohashes: geohashObject.geohashNearby,
		}
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

	const viewPostDetails = (postData: PostEntityOptional) => {
		navigateToPostView(postData, navigation, 'Home')
	}

	const viewLeaderPostsDetails = (leaderPostData: PollEntity & PetitionEntity) => {
		navigateToLeaderPostsView(leaderPostData, navigation, 'Home')
	}

	const navigateToPostCategories = (postType: PostType) => {
		if (!hasAnyPost()) return
		setLocationDataOnContext({
			searchParams: { ...locationDataContext.searchParams, postType } as any // TODO Type
		})

		navigation.navigate('ViewPostsByPostType', { postType })
	}

	const navigateToProfile = (userId: string) => {
		if (userDataContext.userId === userId) {
			navigation.navigate('Profile' as any)
			return
		}
		navigation.navigate('ProfileHome', { userId, stackLabel: '' })
	}

	const viewPostsByRange = (postRange: PostRange) => {
		const rangeConfig = { // Filtrar enquetes e abaixos
			near: { postsByRange: feedPosts.nearby, postRange: 'near' as PostRange },
			city: { postsByRange: feedPosts.city, postRange: 'city' as PostRange },
			country: { postsByRange: feedPosts.country, postRange: 'country' as PostRange }
		}
		navigation.navigate('ViewPostsByRange', { ...rangeConfig[postRange], searchByRange: true })
	}

	const hasAnyPost = () => {
		return feedPosts
			&& (
				(feedPosts.nearby && feedPosts.nearby.length > 0)
				|| (feedPosts.city && feedPosts.city.length > 0)
				|| (feedPosts.country && feedPosts.country.length > 0)
			)
	}

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('SelectSubscriptionRange')
	}

	const navigateToEditUserLocation = () => {
		navigation.navigate('EditProfile' as any, { user: userDataContext })
		navigation.navigate('EditUserLocation' as any, { initialCoordinates: null })
	}

	const navigateToPublicServices = () => {
		navigation.navigate('PublicServicesStack')
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<ScreenContainer topSafeAreaColor={theme.orange2}>
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
				<FlatList
					style={{ flex: 1, width: '100%', overflow: 'visible' }}
					showsVerticalScrollIndicator={false}
					data={[1]}
					renderItem={(() => { }) as any}
					refreshControl={(
						<RefreshControl
							tintColor={theme.black4}
							colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
							refreshing={feedIsUpdating}
							progressBackgroundColor={theme.white3}
							onRefresh={refreshFeedPosts}
						/>
					)}
					ListHeaderComponent={(
						<>
							<HomeCatalogMenu navigateToScreen={navigateToPostCategories} />
							<AdsCarousel
								onPressCorreAd={() => setSubscriptionModalIsVisible(true)}
								onPressPublicServicesAd={navigateToPublicServices}
								onPressUserLocationAd={navigateToEditUserLocation}
							/>
							{!hasLocationEnable && !hasAnyPost() && searchEnded && (
								<RequestLocation
									getLocationPermissions={() => {
										requestPermissions()
										findFeedPosts('', true)
									}}
								/>
							)}
						</>
					)}
					CellRendererComponent={() => (
						<FeedByRange
							searchEnded={searchEnded}
							backgroundColor={theme.orange2}
							filteredFeedPosts={feedPosts}
							viewPostsByRange={viewPostsByRange}
							navigateToProfile={navigateToProfile}
							goToPostView={viewPostDetails}
							goToLeaderPostsView={viewLeaderPostsDetails}
						/>
					)}
				/>
			</Container>
		</ScreenContainer>
	)
}

export { Home }
