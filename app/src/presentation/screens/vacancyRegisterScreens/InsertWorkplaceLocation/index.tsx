import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { InsertWorkplaceLocationScreenProps } from '@routes/Stack/VacancyStack/stackScreenProps'
import { Coordinates, PostCollection } from '@services/firebase/types'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress } = UiLocationUtils()

function InsertWorkplaceLocation({ route, navigation }: InsertWorkplaceLocationScreenProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)
	const { setVacancyDataOnContext } = useContext(VacancyContext)
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

	const getLastPostCity = () => {
		const lastUserPost: PostCollection = getLastUserPost()
		return lastUserPost && lastUserPost.location ? lastUserPost.location?.city || '' : ''
	}

	const toggleRangeChangeModalVisibility = () => {
		setLocationChangeModalIsVisible(!locationChangeModalIsVisible)
	}

	const saveLocation = async (markerCoordinate: Coordinates, rangeVerified?: boolean) => {
		const coordinates = !rangeVerified ? markerCoordinate : currentMarkerCoodinate

		if (!rangeVerified) {
			setCurrentMarkerCoordinate(coordinates)
			if (!coordinates) return
		}

		const geocodeAddress = await getReverseGeocodeByMapsApi(coordinates?.latitude as number, coordinates?.longitude as number)
		const completeAddress = structureAddress(geocodeAddress, coordinates?.latitude, coordinates?.longitude)

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
			setVacancyDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		}

		navigation.navigate('VacancyLocationViewPreview', {
			locationView,
			editMode: editModeIsTrue()
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<LocationChangeConfirmationModal
				visibility={locationChangeModalIsVisible}
				currentPostAddress={getLastPostCity()}
				newRangeSelected={'city'}
				onPressButton={() => saveLocation(currentMarkerCoodinate as Coordinates, true)}
				closeModal={toggleRangeChangeModalVisibility}
			/>

			<SelectPostLocation
				backgroundColor={theme.green2}
				validationColor={theme.green1}
				initialValue={editModeIsTrue() ? initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertWorkplaceLocation }
