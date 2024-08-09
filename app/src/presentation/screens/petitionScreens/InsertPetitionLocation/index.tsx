import React from 'react'
import { StatusBar } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { Coordinates } from '@domain/post/entity/types'

import { useEditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionLocationScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'
import { theme } from '@common/theme'

import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress } = UiLocationUtils()

function InsertPetitionLocation({ route, navigation }: InsertPetitionLocationScreenProps) {
	const { petitionDataContext, setPetitionDataOnContext } = usePetitionContext()
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocation = async (markerCoordinate: Coordinates) => {
		const coordinates = {
			latitude: markerCoordinate.latitude,
			longitude: markerCoordinate.longitude
		}

		const geocodeAddress = await getReverseGeocodeByMapsApi(coordinates.latitude, coordinates.longitude)
		const completeAddress = structureAddress(geocodeAddress, coordinates.latitude, coordinates.longitude)
		const geohashObject = generateGeohashes(coordinates.latitude, coordinates.longitude)

		const petitionLocation: PetitionEntity['location'] = { ...completeAddress, ...geohashObject }

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ location: petitionLocation })
			navigation.goBack()
			return
		}

		setPetitionDataOnContext({ location: petitionLocation })
		navigation.reset({
			index: 0,
			routes: [{
				name: 'PetitionReview',
				params: { petitionData: { ...petitionDataContext, location: petitionLocation }, unsavedPetition: true }
			}],
		})
	}

	const getInitialCoordinateValue = () => {
		if (route.params && route.params.initialValue) {
			return {
				latitude: route.params?.initialValue?.coordinates.latitude,
				longitude: route.params?.initialValue?.coordinates.longitude
			}
		}
		return { latitude: 0, longitude: 0 }
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<SelectPostLocation
				customTitle={'onde você quer publicar esse abaixo assinado?'}
				customTitleHighligh={['abaixo', 'assinado?']}
				backgroundColor={theme.colors.purple[2]}
				initialValue={getInitialCoordinateValue()}
				validationColor={theme.colors.purple[1]}
				navigateBackwards={() => navigation.goBack()}
				saveLocation={saveLocation}
			/>
		</>
	)
}

export { InsertPetitionLocation }
