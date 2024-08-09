import * as Location from 'expo-location' // REFACTOR Centralizar request permissions
import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { PollEntity } from '@domain/poll/entity/types'
import { usePollDomain } from '@domain/poll/usePollDomain'

import { usePollRepository } from '@data/poll/usePollRepository'

import { AuthContext } from '@contexts/AuthContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { FinishedPollResponseScreenProps } from '@routes/Stack/PollStack/screenProps'

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

const { sendPollResponse } = usePollDomain()

const { getCurrentLocation } = useLocationService()
const { getReverseGeocodeByMapsApi } = useGoogleMapsService()

function FinishedPollResponse({ navigation }: FinishedPollResponseScreenProps) {
	const { pollToRespond, pollResponseData } = usePollRegisterContext()
	const { userDataContext } = useContext(AuthContext)

	const [hasLocationPermissions, setHasLocationPermissions] = useState(false)
	const [locationPermissionModalModalIsVisible, setLocationPermissionModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const theme = useTheme()

	const owner = { ...pollToRespond.owner }

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

			sendPollResponse(usePollRepository, pollToRespond.pollId, {
				userId: userDataContext.userId,
				location: {
					...currentLocation,
					...geohashObject
				} as PollEntity['location'],
				responses: pollResponseData
			})

			setIsLoading(false)
			navigation.navigate('ViewPoll', {} as any)
			navigation.goBack()
		} catch (error) {
			setIsLoading(false)
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
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(80)}
				centralized
				backgroundColor={theme.colors.purple[2]}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<InstructionCard
						fontSize={16}
						message={'muito obrigado por responder a enquete!'}
						highlightedWords={['muito', 'obrigado', 'por', 'responder', 'a', 'enquete!']}
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
								<Loader flex />
							) : (
								<PrimaryButton
									color={theme.colors.green[3]}
									label={'enviar respostas'}
									labelColor={theme.colors.white[3]}
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

export { FinishedPollResponse }
