import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import { UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { ProfilePicturePreviewScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { Container, InstructionCardContainer } from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { screenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { CustomCameraModal } from '@components/_modals/CustomCameraModal'
import { Loader } from '@components/Loader'
import { PhotoPortrait } from '@components/PhotoPortrait'

const { uploadUserMedia, createNewUser } = useUserDomain()

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {
	const { userRegistrationData, setRemoteUserOnLocal } = useAuthContext()

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(false)
	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: profilePicture.length ? 'está boa?' : 'adiciona a sua foto aí!',
			highlightedWords: ['boa', 'foto']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado']
		}
	}

	const throwServerSideError = (err: any) => {
		setHasServerSideError(true)
	}

	const backToCustomCamera = () => {
		setCameraModalVisibility(true)
		setProfilePicture([])
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const setPictureUri = (pictureUri: string) => {
		setProfilePicture([pictureUri])
	}

	const saveUserData = async () => {
		try {
			const userData = userRegistrationData
			console.log(userData)

			setIsLoading(true)

			let pictureUrl = [''] // REFACTOR Migrar para dentro do método de salvar
			if (profilePicture.length) {
				pictureUrl = await uploadUserMedia(useUserRepository, profilePicture, 'pictures')
			}

			await createNewUser(useUserRepository, { ...userData, profilePictureUrl: pictureUrl } as UserRegisterData)
			await setRemoteUserOnLocal(userData.userId)

			setIsLoading(false)
			navigateToHome()
		} catch (err) {
			throwServerSideError(err)
		} finally {
			setIsLoading(false)
		}
	}

	const navigateToHome = async () => {
		setHasServerSideError(false)
		return navigation.navigate('UserStack', { newUser: true })
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility && !profilePicture.length}
				onClose={() => { setCameraModalVisibility(false) }}
				setPictureUri={setPictureUri}
			/>
			<DefaultHeaderContainer
				relativeHeight={!hasServerSideError ? '70%' : '68%'}
				centralized
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-around'}
				backgroundColor={hasServerSideError ? theme.red2 : theme.green2}
			>
				<InstructionCardContainer>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						flex={1}
						fontSize={16}
						message={getHeaderMessage()}
						highlightedWords={getHeaderHighlightedWords()}
					/>
				</InstructionCardContainer>
				<PhotoPortrait pictureUri={profilePicture[0]} width={screenWidth} height={screenWidth} />
			</DefaultHeaderContainer>
			<FormContainer >
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.green3}
									flexDirection={'row-reverse'}
									SvgIcon={CheckWhiteIcon}
									label={'tá ótima, bora'}
									labelColor={theme.white3}
									highlightedWords={['bora']}
									onPress={saveUserData}
								/>
								<PrimaryButton
									color={theme.yellow3}
									SvgIcon={AddPictureWhiteIcon}
									label={'nem, escolher outra'}
									labelColor={theme.black4}
									highlightedWords={['escolher', 'outra']}
									onPress={backToCustomCamera}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { ProfilePicturePreview }
