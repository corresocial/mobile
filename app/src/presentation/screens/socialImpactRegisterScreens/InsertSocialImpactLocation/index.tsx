import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { Coordinates, PostEntityCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { InsertSocialImpactLocationScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { LocationChangeConfirmationModal } from '@components/_modals/LocationChangeConfirmation'
import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress } = UiLocationUtils()

function InsertSocialImpactLocation({ route, navigation }: InsertSocialImpactLocationScreenProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
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

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})
		} else {
			setSocialImpactDataOnContext({
				location: {
					...completeAddress,
					...geohashObject
				} as PostEntityCommonFields['location']
			})
		}

		navigation.navigate('SocialImpactLocationViewPreview', {
			locationView,
			editMode: !!route.params?.editMode
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<LocationChangeConfirmationModal
				visibility={locationChangeModalIsVisible}
				currentPostAddress={getLastPostCity()}
				newRangeSelected={'city'}
				onPressButton={() => saveLocation(currentMarkerCoodinate as Coordinates, true)}
				closeModal={toggleRangeChangeModalVisibility}
			/>

			<SelectPostLocation
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				initialValue={editModeIsTrue() ? initialValue : { latitude: 0, longitude: 0 }}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertSocialImpactLocation }
