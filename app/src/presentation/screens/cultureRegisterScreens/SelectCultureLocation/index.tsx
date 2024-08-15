import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { Coordinates } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { useCultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { SelectCultureLocationScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress } = UiLocationUtils()

function SelectCultureLocation({ route, navigation }: SelectCultureLocationScreenProps) {
	const { userDataContext, userPostsContext, getLastUserPost } = useContext(AuthContext)
	const { isSecondPost, cultureDataContext, setCultureDataOnContext } = useCultureContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [currentMarkerCoodinate, setCurrentMarkerCoordinate] = useState<Coordinates>()
	const [locationChangeModalIsVisible, setLocationChangeModalIsVisible] = useState(false)

	const { locationView, initialValue } = route.params

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const userSubscriptionIsCity = () => userDataContext.subscription?.subscriptionRange === 'city'

	const userHasSomePost = () => userPostsContext && userPostsContext.length > 0

	const currentLocationIsInAnotherCity = (city: string) => {
		if (!city) return false
		return city !== getLastPostCity()
	}

	const getLastPostCity = () => {
		const lastUserPost = getLastUserPost()
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
		const locationProperties = {
			range: cultureDataContext.range || userDataContext.subscription?.subscriptionRange || 'near',
			locationView,
			location: {
				...completeAddress,
				...geohashObject
			}
		}

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ ...locationProperties })
			return navigation.pop(2)
		}

		setCultureDataOnContext({ ...locationProperties })

		navigation.reset({
			index: 0,
			routes: [{
				name: 'CulturePostReview',
				params: {
					postData: { ...cultureDataContext, ...locationProperties },
					unsavedPost: true,
					showPresentationModal: !isSecondPost
				}
			}]
		})
	}

	const getInitialMapViewPosition = () => {
		if (cultureDataContext.location) {
			return cultureDataContext.location.coordinates
		}
		return editModeIsTrue() ? initialValue : { latitude: 0, longitude: 0 }
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<LocationChangeConfirmationModal
				visibility={locationChangeModalIsVisible}
				currentPostAddress={getLastPostCity()}
				newRangeSelected={'city'}
				onPressButton={() => saveLocation(currentMarkerCoodinate as Coordinates, true)}
				closeModal={toggleRangeChangeModalVisibility}
			/>

			<SelectPostLocation
				backgroundColor={theme.colors.blue[2]}
				validationColor={theme.colors.blue[1]}
				initialValue={getInitialMapViewPosition()}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { SelectCultureLocation }
