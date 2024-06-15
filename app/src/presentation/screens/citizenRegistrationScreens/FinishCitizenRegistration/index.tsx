import * as Location from 'expo-location' // REFACTOR Centralizar request permissions
import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { FinishCitizenRegistrationScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'
import { structureAddress } from '@utils-ui/location/addressFormatter'

import { ButtonOptionsContainer } from './styles'
import MapPointerWhiteIcon from '@assets/icons/mapPoint-white.svg'
import SendFileWhiteIcon from '@assets/icons/sendFile-white.svg'
import { generateGeohashes } from '@common/generateGeohashes'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { CustomModal } from '@components/_modals/CustomModal'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'
import { Loader } from '@components/Loader'

const { getCurrentLocation } = useLocationService()
const { getReverseGeocodeByMapsApi } = useGoogleMapsService()

function FinishCitizenRegistration({ navigation }: FinishCitizenRegistrationScreenProps) {
	const [hasLocationPermissions, setHasLocationPermissions] = useState(false)
	const [locationPermissionModalModalIsVisible, setLocationPermissionModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const theme = useTheme()

	const checkLocationPermissions = async () => {
		const { granted } = await Location.getForegroundPermissionsAsync()
		setHasLocationPermissions(granted)
		if (granted) return true

		setLocationPermissionModalIsVisible(true)
	}

	const requestLocationPermissions = async () => {
		const locationPermission = await Location.requestForegroundPermissionsAsync()
		setHasLocationPermissions(locationPermission.granted)
	}

	const submitResponses = async () => {
		try {
			setIsLoading(true)
			if (!hasLocationPermissions) {
				const hasPermission = await checkLocationPermissions()
				console.log(`has location permission: ${hasPermission}`)
				if (!hasPermission) return
			}

			const currentCoordinates = await getCurrentLocation()
			const currentLocation = await getReverseGeocodeByMapsApi(currentCoordinates.coords.latitude, currentCoordinates.coords.longitude)
			const completeAddress = structureAddress(currentLocation)
			const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

			// sendPollResponse(usePollRepository, pollToRespond.pollId, {
			// 	userId: userDataContext.userId,
			// 	location: {
			// 		...currentLocation,
			// 		...geohashObject
			// 	} as PollEntity['location'],
			// 	responses: pollResponseData
			// })
			console.log('Respostas enviadas!')

			setIsLoading(false)
			navigation.navigate('CitizenRegistrationHome')
		} catch (error) {
			setIsLoading(false)
		}
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange1}>
			<CustomModal
				visibility={locationPermissionModalModalIsVisible}
				title={'precisamos da sua localização'}
				TitleIcon={MapPointerWhiteIcon}
				firstParagraph={{
					text: 'precisamos da sua localização para poder saber de onde você está respondendo',
					textAlign: 'center',
					highlightedWords: ['de', 'onde', 'você', 'está', 'respondendo']
				}}
				affirmativeButton={{
					label: 'entendi',
					onPress: async () => {
						await requestLocationPermissions()
						await submitResponses()
					}
				}}
				closeModal={() => setLocationPermissionModalIsVisible(false)}
			/>
			<CitizenRegistrationHeader
				message={'cadastro cidadão finalidado!'}
				customHeaderHeight={'60%'}
				navigateBackwards={() => { }}
			/>
			<FormContainer>
				<ButtonOptionsContainer>
					{
						isLoading
							? (
								<Loader flex />
							) : (
								<PrimaryButton
									color={theme.green3}
									label={'enviar respostas'}
									labelColor={theme.white3}
									SecondSvgIcon={SendFileWhiteIcon}
									onPress={submitResponses}
								/>
							)
					}
				</ButtonOptionsContainer>
			</FormContainer>
		</ScreenContainer>
	)
}

export { FinishCitizenRegistration }
