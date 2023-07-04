import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { generateGeohashes } from '../../../common/generateGeohashes'
import { convertGeocodeToAddress } from '../../../utils/maps/addressFormatter'

import { InsertServicePrestationLocationScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { Coordinates, PostCollection } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { AuthContext } from '../../../contexts/AuthContext'
import { EditContext } from '../../../contexts/EditContext'

import { SelectPostLocation } from '../../../components/_onboarding/SelectPostLocation'
import { LocationChangeConfirmationModal } from '../../../components/_modals/LocationChangeConfirmation'

function InsertServicePrestationLocation({ route, navigation }: InsertServicePrestationLocationScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [currentMarkerCoodinate, setCurrentMarkerCoordinate] = useState<Coordinates>()
	const [locationChangeModalIsVisible, setLocationChangeModalIsVisible] = useState(false)

	const { locationView, initialValue } = route.params

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const userSubscriptionIsCity = () => userDataContext.subscription?.subscriptionRange === 'city'

	const userHasSomePost = () => userDataContext.posts && userDataContext.posts.length > 0

	const currentLocationIsInAnotherCity = (city: string) => {
		if (!city) return false
		return city !== getLastPostCity()
	}

	const getLastUserPost = () => {
		const userPosts: PostCollection[] = userDataContext.posts || []
		const lastUserPost: PostCollection = userPosts[userPosts.length - 1]
		return lastUserPost
	}

	const getLastPostCity = () => {
		const lastUserPost: PostCollection = getLastUserPost()
		return lastUserPost && lastUserPost.location ? lastUserPost.location?.city || '' : ''
	}

	const toggleRangeChangeModalVisibility = () => {
		setLocationChangeModalIsVisible(!locationChangeModalIsVisible)
	}

	const markerCoordinateIsAccuracy = (markerCoordinate: Coordinates) => markerCoordinate?.latitudeDelta as number < 0.0065

	const saveLocation = async (markerCoordinate: Coordinates, rangeVerified?: boolean) => {
		const coordinates = !rangeVerified ? markerCoordinate : currentMarkerCoodinate

		if (!rangeVerified) {
			setCurrentMarkerCoordinate(coordinates)
			if (!coordinates) return
			if (!markerCoordinateIsAccuracy(coordinates as Coordinates)) return
		}

		const completeAddress = await convertGeocodeToAddress(coordinates?.latitude as number, coordinates?.longitude as number)

		if (!rangeVerified) {
			if (
				userSubscriptionIsCity()
				&& editModeIsTrue()
				&& userHasSomePost()
				&& currentLocationIsInAnotherCity(completeAddress.city)
			) {
				toggleRangeChangeModalVisibility()
				return
			}
		}

		const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		} else {
			setServiceDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('ServiceLocationViewPreview', {
			locationView,
			editMode: editModeIsTrue()
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<LocationChangeConfirmationModal
				visibility={locationChangeModalIsVisible}
				currentPostAddress={getLastPostCity()}
				newRangeSelected={'city'}
				onPressButton={() => saveLocation(currentMarkerCoodinate as Coordinates, true)}
				closeModal={toggleRangeChangeModalVisibility}
			/>

			<SelectPostLocation
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
				searchPlaceholder={'digite o endereço do serviço'}
				initialValue={editModeIsTrue() ? initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertServicePrestationLocation }
