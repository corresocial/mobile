import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import { StatusBar } from 'react-native'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { SelectAuthMethodScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { useAuthenticationService } from '@services/authentication/useAuthenticationService'

import { Container } from './styles'
import GoogleWhiteIcon from '@assets/icons/google-white.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { SocialLoginAlertModal } from '@components/_modals/SocialLoginAlertModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

const { signInByGoogleCredential } = useAuthenticationService()

const { remoteStorage } = useUserRepository()

WebBrowser.maybeCompleteAuthSession()

function SelectAuthMethod({ route, navigation }: SelectAuthMethodScreenProps) {
	const { setUserRegisterDataOnContext, performQuickSignin } = useAuthContext()

	const newUser = route.params?.newUser

	const [isLoading, setIsLoading] = React.useState(false)
	const [hasError, setHasError] = React.useState(false)

	const [authenticatedUser, setAuthenticatedUser] = React.useState({ userId: '', email: '' })
	const [socialLoginAlertModalIsVisible, setSocialLoginAlertModalIsVisible] = React.useState(false)

	const navigateBackwards = () => navigation.goBack()

	const performSigninWithCellNumber = async () => {
		navigation.navigate('InsertCellNumber', { newUser })
	}

	const performSigninWithGoogle = async () => {
		try {
			setIsLoading(true)
			setHasError(false)

			const { userId, email } = await signInByGoogleCredential() as { userId: string, email: string }

			if (userId && email) {
				setAuthenticatedUser({ userId, email })
				const userAlreadyExists = await remoteStorage.userExists(userId)

				if (!newUser && !userAlreadyExists) {
					console.log('Usuário não está cadastrado, quer cadastrar?')
					toggleSocialLoginAlertModalVisibility()
					return
				}

				if (newUser && userAlreadyExists) {
					console.log('Usuário já está cadastrado, quer logar?')
					toggleSocialLoginAlertModalVisibility()
					return
				}

				if (newUser) {
					return navigateToCreateNewAccount({ userId, email })
				}

				await performLoginOnApp({ userId })
			}
		} catch (error) {
			console.log(error)
			setHasError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const navigateToCreateNewAccount = async (user?: { userId: string, email: string }) => {
		const { userId, email } = user || authenticatedUser
		setUserRegisterDataOnContext({ userId, email, cellNumber: '' })
		navigation.navigate('InsertName') // TODO Negar volta
	}

	const performLoginOnApp = async (user?: { userId: string }) => {
		const { userId } = user || authenticatedUser
		await performQuickSignin(userId, false)
	}

	const toggleSocialLoginAlertModalVisibility = () => {
		setSocialLoginAlertModalIsVisible((previousValue) => !previousValue)
	}

	return (
		<Container >
			<StatusBar backgroundColor={newUser ? theme.colors.purple[2] : theme.colors.green[2]} barStyle={'dark-content'} />
			<SocialLoginAlertModal
				visibility={socialLoginAlertModalIsVisible}
				accountIdentifier={authenticatedUser.email}
				registerMethod={newUser}
				hasError={hasError}
				closeModal={toggleSocialLoginAlertModalVisibility}
				onPressButton={newUser ? performLoginOnApp : navigateToCreateNewAccount}
			/>
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={newUser ? theme.colors.purple[2] : theme.colors.green[2]}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={`como você prefere ${newUser ? 'criar uma conta' : 'entrar'}?`}
					highlightedWords={newUser ? ['criar', 'uma', 'conta'] : ['entrar?']}
					fontSize={16}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.colors.white[3]} justifyContent={'center'}>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.colors.green[3]}
									SecondSvgIcon={SmartphoneWhiteIcon}
									svgIconScale={['50%', '30%']}
									label={'telefone'}
									highlightedWords={['telefone']}
									labelColor={theme.colors.white[3]}
									onPress={performSigninWithCellNumber}
								/>
								<VerticalSpacing height={5} />
								<PrimaryButton
									color={theme.colors.white[3]}
									SecondSvgIcon={GoogleWhiteIcon}
									svgIconScale={['50%', '30%']}
									labelColor={theme.colors.black[4]}
									label={'continuar \ncom google'}
									highlightedWords={[newUser ? 'entrar' : 'continuar', '\ncom', 'google']}
									textAlign={'left'}
									onPress={performSigninWithGoogle}
								/>
							</>
						)
				}
			</FormContainer>
		</Container >
	)
}

export { SelectAuthMethod }
