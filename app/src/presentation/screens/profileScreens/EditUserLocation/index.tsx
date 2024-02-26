import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { EditContext } from '@contexts/EditContext'

import { EditUserLocationScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { PostCollectionCommonFields } from '@services/firebase/types'

import { LocationService } from '@services/location/LocationService'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'

import { generateGeohashes } from '@common/generateGeohashes'

import { SelectPostLocation } from '@components/_onboarding/SelectPostLocation'

const { convertGeocodeToAddress } = LocationService()
const { structureExpoLocationAddress } = UiLocationUtils()

function EditUserLocation({ navigation }: EditUserLocationScreenProps) {
	const theme = useTheme()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [isLoading, setIsLoading] = useState(false)

	const saveUserLocation = async (coordinates:PostCollectionCommonFields['location']['coordinates']) => {
		try {
			setIsLoading(true)

			const geocodeAddress = await convertGeocodeToAddress(coordinates?.latitude as number, coordinates?.longitude as number)
			const completeAddress = structureExpoLocationAddress(geocodeAddress, coordinates?.latitude, coordinates?.longitude)
			const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

			addNewUnsavedFieldToEditContext({
				location: {
					...completeAddress,
					...geohashObject
				}
			})

			setIsLoading(false)

			navigateBackwards()
		} catch (err) {
			console.log(err)
		}
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<SelectPostLocation
				backgroundColor={theme.orange2}
				validationColor={theme.orange1}
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
