import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import { UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { InsertProfilePictureScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { Container } from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import xWhiteIcon from '@assets/icons/x-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

const { createNewUser } = useUserDomain()

function InsertProfilePicture({ navigation, route }: InsertProfilePictureScreenProps) {
	const { userRegistrationData, setRemoteUserOnLocal } = useAuthContext()

	const [isLoading, setIsLoading] = useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'que tal adicionar uma \nfoto de perfil?',
			highlightedWords: ['\nfoto', 'de', 'perfil']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado,']
		}
	}

	const navigateToProfilePicture = () => {
		setHasServerSideError(false)
		navigation.navigate('ProfilePicturePreview')
	}

	// REFACTOR no domínio e ser chamado pelo contexto de autenticação
	const saveUserData = async () => {
		try {
			const userData = userRegistrationData

			setIsLoading(true)

			await createNewUser(useUserRepository, { ...userData } as UserRegisterData)
			await setRemoteUserOnLocal(userData.userId)
			setIsLoading(false)
			navigateToHome()
		} catch (err) {
			console.log(err)
			setIsLoading(false)
			setHasServerSideError(true)
		}
	}

	const navigateToHome = () => {
		navigation.navigate('UserStack', { newUser: true })
	}

	const navigateBackwards = () => navigation.goBack()

	const getHeaderMessage = () => {
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={hasServerSideError ? theme.red2 : theme.green2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={getHeaderMessage()}
					highlightedWords={getHeaderHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2} justifyContent={'center'}>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.red3}
									SvgIcon={xWhiteIcon}
									label={'não, obrigado'}
									labelColor={theme.white3}
									highlightedWords={['não']}
									onPress={saveUserData}
								/>
								<VerticalSpacing height={5} />
								<PrimaryButton
									color={theme.green3}
									SecondSvgIcon={AddPictureWhiteIcon}
									svgIconScale={['50%', '25%']}
									labelColor={theme.white3}
									label={'opa, claro!'}
									highlightedWords={['claro!']}
									onPress={navigateToProfilePicture}
								/>
							</>
						)
				}
			</FormContainer>
		</Container >
	)
}

export { InsertProfilePicture }
