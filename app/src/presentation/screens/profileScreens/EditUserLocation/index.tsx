import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { PostEntityCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { EditUserLocationScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'

import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { getReverseGeocodeByMapsApi } = useGoogleMapsService()
const { structureAddress /* googleMapsApi */ } = UiLocationUtils() // REFACTOR This is a service

function EditUserLocation({ route, navigation }: EditUserLocationScreenProps) {
	const theme = useTheme()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { userDataContext } = useContext(AuthContext)

	const [isLoading, setIsLoading] = useState(false)

	const saveUserLocation = async (coordinates: PostEntityCommonFields['location']['coordinates']) => {
		try {
			setIsLoading(true)

			const geocodeAddress = await getReverseGeocodeByMapsApi(coordinates?.latitude as number, coordinates?.longitude as number)

			if (!geocodeAddress) {
				console.log('Não foi possível converter o geocode')
				return
			}

			const addressObject = structureAddress(geocodeAddress, coordinates?.latitude, coordinates?.longitude)
			const { geohashNearby } = generateGeohashes(coordinates.latitude, coordinates.longitude)

			addNewUnsavedFieldToEditContext({
				location: { ...addressObject, geohashNearby, userId: userDataContext.userId }
			})

			setIsLoading(false)

			navigateBackwards()
		} catch (err) {
			console.log(err)
		}
	}

	const getInitialCoordinateValue = () => {
		if (route.params && route.params.initialCoordinates) {
			return route.params.initialCoordinates
		}
		return { latitude: 0, longitude: 0 }
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.orange2}
				validationColor={theme.orange1}
				initialValue={getInitialCoordinateValue()}
				isLoading={isLoading}
				headerDescription={'Localização utilizada para envio de notificações da prefeitura. \nessa informação não será divulgada publicamente'}
				headerDescriptionHighlightedWords={['\nessa', 'informação', 'não', 'será', 'divulgada', 'publicamente']}
				navigateBackwards={navigateBackwards}
				saveLocation={saveUserLocation}
			/>
		</>
	)
}

export { EditUserLocation }
