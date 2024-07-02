import * as Location from 'expo-location' // REFACTOR Centralizar request permissions
import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'

import { FinishCitizenRegistrationScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'
import { structureAddress } from '@utils-ui/location/addressFormatter'
import { getNetworkStatus } from '@utils/deviceNetwork'

import { ButtonOptionsContainer } from './styles'
import MapPointerWhiteIcon from '@assets/icons/mapPoint-white.svg'
import SendFileWhiteIcon from '@assets/icons/sendFile-white.svg'
import { generateGeohashes } from '@common/generateGeohashes'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { FormContainer } from '@components/_containers/FormContainer'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { CustomModal } from '@components/_modals/CustomModal'
import { WithoutNetworkConnectionAlert } from '@components/_modals/WithoutNetworkConnectionAlert'
import { CitizenRegistrationHeader } from '@components/CitizenRegistrationHeader'
import { Loader } from '@components/Loader'

const { getCurrentLocation } = useLocationService()
const { getReverseGeocodeByMapsApi } = useGoogleMapsService()

const citizenUseCases = new CitizenRegisterUseCases()

function FinishCitizenRegistration({ navigation }: FinishCitizenRegistrationScreenProps) {
	const { userDataContext } = useAuthContext()
	const { citizenRegistrationIdentifier, citizenRegistrationResponseData } = useCitizenRegistrationContext()

	const [hasLocationPermissions, setHasLocationPermissions] = useState(false)
	const [locationPermissionModalModalIsVisible, setLocationPermissionModalIsVisible] = useState(false)
	const [timeoutModalIsVisible, setTimeoutModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const theme = useTheme()

	// console.log({
	// 	...citizenRegistrationIdentifier,
	// 	responses: citizenRegistrationResponseData
	// })

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

	const checkNetworkStatus = async () => {
		const networkStatus = await getNetworkStatus()
		return !!networkStatus.isConnected && !!networkStatus.isInternetReachable
	}

	const submitResponses = async () => {
		try {
			setIsLoading(true)
			if (!hasLocationPermissions) {
				const hasPermission = await checkLocationPermissions()
				console.log(`has location permission: ${hasPermission}`)
				if (!hasPermission) return
			}

			const hasValidNetworkConnection = await checkNetworkStatus()

			const currentCoordinates = await getCurrentLocation() // MODEL
			const currentLocation = await getReverseGeocodeByMapsApi(currentCoordinates.coords.latitude, currentCoordinates.coords.longitude)
			const completeAddress = structureAddress(currentLocation)
			const geohashObject = generateGeohashes(completeAddress.coordinates.latitude, completeAddress.coordinates.longitude)

			const citizenRegisterData = {
				...citizenRegistrationIdentifier,
				responses: citizenRegistrationResponseData,
				location: {
					...currentLocation,
					...geohashObject,
					coordinates: {
						latitude: currentCoordinates.coords.latitude,
						longitude: currentCoordinates.coords.longitude
					}
				} as CitizenRegisterEntity['location']
			}

			const offlineRegisterId = await citizenUseCases.saveCitizenRegisterOffline(userDataContext, citizenRegisterData)
			await citizenUseCases.removeCitizenRegistrationInProgress()

			if (!hasValidNetworkConnection) {
				setIsLoading(false)
				setTimeoutModalIsVisible(true)
				return
			}

			const timeoutId = setTimeout(() => {
				setIsLoading(false)
				setTimeoutModalIsVisible(true)
			}, 20000) // Se durar mais que 20 segundos

			await citizenUseCases.createCitizenRegister(userDataContext, citizenRegisterData)
			clearTimeout(timeoutId)

			await citizenUseCases.deleteOfflineCitizenRegister(offlineRegisterId || '')

			setIsLoading(false)
			navigation.navigate('CitizenRegistrationHome')
		} catch (error) {
			console.log(error)
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
			<WithoutNetworkConnectionAlert
				visibility={timeoutModalIsVisible}
				title={'não foi possível enviar as respostas'}
				message={'houve um erro de conexão e as respostas foram armazenadas no dispositivo, você pode tentar novamente agora ou posteriormente quando houver uma conexão mais estável'}
				highlightedWords={['armazenadas', 'no', 'dispositivo,']}
				onPressButton={() => setTimeoutModalIsVisible(false)}
			/>
			<CitizenRegistrationHeader
				message={'cadastro cidadão finalidado!'}
				customHeaderHeight={'60%'}
				navigateBackwards={() => navigation.goBack()}
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
