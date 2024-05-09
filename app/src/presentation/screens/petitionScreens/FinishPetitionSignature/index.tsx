import * as Location from 'expo-location' // REFACTOR Centralizar request permissions
import React, { useContext, useState } from 'react'
import { useTheme } from 'styled-components'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'

import { usePetitionRepository } from '@data/petition/usePetitionRepository'

import { AuthContext } from '@contexts/AuthContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { FinishPetitionSignatureScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { useGoogleMapsService } from '@services/googleMaps/useGoogleMapsService'
import { useLocationService } from '@services/location/useLocationService'
import { structureAddress } from '@utils-ui/location/addressFormatter'

import { ButtonOptionsContainer, Container, InstructionButtonContainer } from './styles'
import MapPointerWhiteIcon from '@assets/icons/mapPoint-white.svg'
import SendFileWhiteIcon from '@assets/icons/sendFile-white.svg'
import { generateGeohashes } from '@common/generateGeohashes'
import { relativeScreenHeight } from '@common/screenDimensions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { CustomModal } from '@components/_modals/CustomModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

const { sendPetitionResponse } = usePetitionDomain()

const { getCurrentLocation } = useLocationService()
const { getReverseGeocodeByMapsApi } = useGoogleMapsService()

function FinishPetitionSignature({ navigation }: FinishPetitionSignatureScreenProps) {
	const { petitionToRespond, petitionSignatureData } = usePetitionContext()
	const { userDataContext } = useContext(AuthContext)

	const [hasLocationPermissions, setHasLocationPermissions] = useState(false)
	const [locationPermissionModalModalIsVisible, setLocationPermissionModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const theme = useTheme()

	const owner = { ...petitionToRespond.owner }

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

			sendPetitionResponse(usePetitionRepository, petitionToRespond.petitionId, {
				...petitionSignatureData,
				userId: userDataContext.userId,
				location: {
					...currentLocation,
					...geohashObject
				} as PetitionEntity['location'],
			})

			setIsLoading(false)
			navigation.navigate('ViewPetition', {} as any)
			navigation.goBack()
		} catch (error) {
			setIsLoading(false)
			console.log(error)
		}
	}

	const getProfilePictureUrl = () => {
		if (!owner || !owner.profilePictureUrl) return null
		return owner.profilePictureUrl[0]
	}

	return (
		<Container>
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
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(80)}
				centralized
				backgroundColor={theme.purple2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<InstructionCard
						fontSize={16}
						message={'muito obrigado por assinar meu abaixo-assinado!'}
						highlightedWords={['muito', 'obrigado', 'responder']}
					>
						<VerticalSpacing />
						<SmallUserIdentification
							userName={owner.name}
							profilePictureUrl={getProfilePictureUrl()}
							showLeaderSeal
						/>
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer>
				<ButtonOptionsContainer>
					{
						isLoading
							? (
								<Loader />
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
		</Container>
	)
}

export { FinishPetitionSignature }
