/* eslint-disable no-unused-vars */
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Alert, Platform, RefreshControl } from 'react-native'
import { getLocales } from 'expo-localization'

import {
	AdSubscriptionContainer,
	Container,
	ContainerPadding,
	DropdownContainer,
	RecentPostsContainer
} from './styles'
import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { searchAddressByText } from '../../../services/maps/searchAddressByText'
import { structureAddress, structureExpoLocationAddress } from '../../../utils/maps/addressFormatter'
import { getLastRecentAddress, getRecentAdressesFromStorage } from '../../../utils/maps/recentAddresses'
import { getPostsByLocationCloud } from '../../../services/cloudFunctions/getPostsByLocationCloud'
// import { getPostsByLocation } from '../../../services/firebase/post/getPostsByLocation'
import { getCurrentLocation } from '../../../utils/maps/getCurrentLocation'

import {
	SearchParams,
	LatLong,
	AddressSearchResult,
	SelectedAddressRender,
	GeocodeAddress,
} from '../../../services/maps/types'
import { FeedPosts, Id, PostCollection, PostRange, PostType } from '../../../services/firebase/types'
import { HomeScreenProps } from '../../../routes/Stack/HomeStack/stackScreenProps'

import { LocationContext } from '../../../contexts/LocationContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { LocationNearDropdown } from '../../../components/LocationNearDropdown'
import { PostCard } from '../../../components/_cards/PostCard'
import { RequestLocation } from '../../../components/RequestLocation'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { HomeCatalogMenu } from '../../../components/HomeCatalogMenu'
import { FlatListPosts } from '../../../components/FlatListPosts'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { getAndUpdateUserToken } from '../../../services/firebase/chat/getAndUpdateUserToken'
import { getReverseGeocodeByMapsApi } from '../../../services/maps/getReverseGeocodeByMapsApi'
import { getPostsByLocation } from '../../../services/firebase/post/getPostsByLocation'
import { SubscriptionButton } from '../../../components/_buttons/SubscriptionButton'
import { SubscriptionInfoModal } from '../../../components/_modals/SubscriptionInfoModal'

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

	const [expoPushTokenState, setExpoPushToken] = useState('') // TODO Refactor
	const [notificationState, setNotification] = useState(false)
	const notificationListener: MutableRefObject<any> = useRef()
	const responseListener: MutableRefObject<any> = useRef()

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

	async function registerForPushNotificationsAsync() {
		let token

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				console.log('não permitiu notificações')
				await getAndUpdateUserToken(userDataContext.userId as Id, null)
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
			await getAndUpdateUserToken(userDataContext.userId as Id, token)
		} else {
			console.log('Must use physical device for Push Notifications')
		}

		return token
	}

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: false,
			shouldSetBadge: false,
		}),
	})

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token || ''))

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(!!notification)
		})

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

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
				searchParams, // Update return of cloud function
				userDataContext.userId as Id
			)

			//  const remoteFeedPosts = await getPostsByLocation(searchParams)
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
		const address = await convertGeocodeToAddress(
			coordinates.lat,
			coordinates.lon
		)

		const deviceLanguage = getLocales()[0].languageCode

		const structuredAddress = deviceLanguage === 'pt'
			? structureExpoLocationAddress(address as Location.LocationGeocodedAddress[], coordinates.lat, coordinates.lon)
			: structureAddress(address as GeocodeAddress, coordinates.lat, coordinates.lon)

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
		const deviceLanguage = getLocales()[0].languageCode

		if (deviceLanguage === 'pt') { // change structure Function
			const geocodeAddress = await Location.reverseGeocodeAsync({
				latitude,
				longitude,
			})
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

	const viewPostsByRange = (postRange: PostRange) => {
		switch (postRange) {
			case 'near': return navigation.navigate('ViewPostsByRange', { postsByRange: feedPosts.nearby, postRange: 'near', searchByRange: true })
			case 'city': return navigation.navigate('ViewPostsByRange', { postsByRange: feedPosts.city, postRange: 'city', searchByRange: true })
			case 'country': return navigation.navigate('ViewPostsByRange', { postsByRange: feedPosts.country, postRange: 'country', searchByRange: true })
			default: return false
		}
	}

	const hasAnyPost = () => {
		return feedPosts.nearby.length > 0 || feedPosts.city.length > 0 || feedPosts.country.length > 0
	}

	const getFirstFiveItems = (items: any[]) => {
		if (!items) return []
		if (items.length >= 5) return items.slice(0, 5)
		return items
	}

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('SelectSubscriptionRange')
	}

	const renderPostItem = (item: PostCollection) => {
		if (item as string === 'subscriptionAd') {
			return (
				<ContainerPadding>
					<SubscriptionButton onPress={() => setSubscriptionModalIsVisible(true)} />
				</ContainerPadding>
			)
		}

		return (
			<ContainerPadding>
				<PostCard
					post={item}
					owner={item.owner}
					navigateToProfile={navigateToProfile}
					onPress={() => goToPostView(item)}
				/>
			</ContainerPadding>

		)
	}

	return (
		<Container>
			<FocusAwareStatusBar
				backgroundColor={theme.orange2}
				barStyle={'dark-content'}
			/>
			<SubscriptionInfoModal
				visibility={subscriptionModalIsVisible}
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
				refreshControl={(
					<RefreshControl
						colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3, theme.purple3, theme.yellow3, theme.red3]}
						refreshing={feedIsUpdating}
						progressBackgroundColor={theme.white3}
						onRefresh={refreshFeedPosts}
					/>
				)}
			>
				{!hasLocationEnable && !hasAnyPost() && (
					<RequestLocation
						getLocationPermissions={() => {
							requestPermissions()
							findFeedPosts('', true)
						}}
					/>
				)}
				{
					(feedPosts.nearby && feedPosts.nearby.length)
						? (
							<FlatListPosts
								data={['subscriptionAd', ...getFirstFiveItems(feedPosts.nearby)]}
								headerComponent={() => (
									<>
										<SubtitleCard
											text={'perto de você'}
											highlightedText={['perto']}
											seeMoreText
											onPress={() => viewPostsByRange('near')}
										/>
										<VerticalSigh />
									</>
								)}
								renderItem={renderPostItem}
								flatListIsLoading={feedIsUpdating}
							// onEndReached={refreshFeedPosts}
							/>
						)
						: <></>
				}
				{
					(feedPosts.city && feedPosts.city.length)
						? (
							<FlatListPosts
								data={getFirstFiveItems(feedPosts.city)}
								headerComponent={() => (
									<>
										<SubtitleCard
											text={'na cidade'}
											highlightedText={['cidade']}
											seeMoreText
											onPress={() => viewPostsByRange('city')}
										/>
										<VerticalSigh />
									</>
								)}
								renderItem={renderPostItem}
								flatListIsLoading={feedIsUpdating}
							/* onEndReached={refreshFeedPosts} */
							/>
						)
						: <></>
				}
				{
					(feedPosts.country && feedPosts.country.length)
						? (
							<>
								<FlatListPosts
									data={getFirstFiveItems(feedPosts.country)}
									headerComponent={() => (
										<>
											<SubtitleCard
												text={'no país'}
												highlightedText={['país']}
												seeMoreText
												onPress={() => viewPostsByRange('country')}
											/>
											<VerticalSigh />
										</>
									)}
									renderItem={renderPostItem}
									flatListIsLoading={feedIsUpdating}
								/* onEndReached={refreshFeedPosts} */
								/>
								<VerticalSigh height={relativeScreenHeight(10)} />
							</>
						)
						: <VerticalSigh height={relativeScreenHeight(10)} />
				}
				{
					hasLocationEnable && searchEnded && !hasAnyPost() && (
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
