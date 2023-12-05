import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { SelectAuthMethodScreenProps } from '@routes/Stack/AuthRegisterStack/stackScreenProps'

import { generateGoogleAuthCredential } from '@services/firebase/user/generateGoogleAuthCredential'
import { signinByCredential } from '@services/firebase/user/signingByCredential'
import { userExists } from '@services/firebase/user/userExists'

import { Container } from './styles'
import GoogleWhiteIcon from '@assets/icons/google-white.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { SocialLoginAlertModal } from '@components/_modals/SocialLoginAlertModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

import { getEnvVars } from '../../../../../environment'

WebBrowser.maybeCompleteAuthSession()
const { AUTH_EXPO_CLIENT_ID, AUTH_ANDROID_CLIENT_ID, AUTH_IOS_CLIENT_ID } = getEnvVars()

function SelectAuthMethod({ route, navigation }: SelectAuthMethodScreenProps) {
	const { setRemoteUserOnLocal } = useContext(AuthContext)

	const { newUser } = route.params

	const keys = {
		expoClientId: AUTH_EXPO_CLIENT_ID,
		androidClientId: AUTH_ANDROID_CLIENT_ID,
		iosClientId: AUTH_IOS_CLIENT_ID
	}

	const [isLoading, setIsLoading] = React.useState(false)
	const [hasError, setHasError] = React.useState(false)

	const [authenticatedUser, setAuthenticatedUser] = React.useState({ userId: '', email: '' })
	const [socialLoginAlertModalIsVisible, setSocialLoginAlertModalIsVisible] = React.useState(false)
	const [tokenGoogle, setTokenGoogle] = React.useState<string | undefined>()
	// eslint-disable-next-line no-unused-vars
	const [request, response, promptAsyncGoogle] = Google.useAuthRequest(keys, {
		projectNameForProxy: '@corresocial/corresocial'
	})

	React.useEffect(() => {
		if (response?.type === 'success') {
			const { authentication } = response
			setTokenGoogle(authentication?.accessToken)
		}

		if (tokenGoogle) {
			performSigninWithGoogle()
		}
	}, [response, tokenGoogle])

	const navigateBackwards = () => navigation.goBack()

	const performSigninWithCellNumber = async () => {
		navigation.navigate('InsertCellNumber', { newUser })
	}

	const performSigninWithGoogle = async () => {
		try {
			setIsLoading(true)
			setHasError(false)
			if (tokenGoogle) {
				const googleCredential = generateGoogleAuthCredential(tokenGoogle)
				const { userId, email } = await signinByCredential(googleCredential)

				if (userId && email) {
					setAuthenticatedUser({ userId, email })
					const userAlreadyExists = await userExists(userId)

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
			} else {
				await promptAsyncGoogle({ projectNameForProxy: '@corresocial/corresocial' })
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
		navigation.navigate('InsertName', {
			userIdentification: { uid: userId },
			email: email || '',
			cellNumber: ''
		})
	}

	const performLoginOnApp = async (user?: { userId: string }) => {
		const { userId } = user || authenticatedUser

		const userLoadedOnContext = await setRemoteUserOnLocal(userId)

		if (userLoadedOnContext) {
			navigation.reset({
				index: 0,
				routes: [{
					name: 'UserStack',
					params: { tourPerformed: true }
				}],
			})
		}
	}

	const toggleSocialLoginAlertModalVisibility = () => {
		setSocialLoginAlertModalIsVisible((previousValue) => !previousValue)
	}

	return (
		<Container >
			<StatusBar backgroundColor={newUser ? theme.purple2 : theme.green2} barStyle={'dark-content'} />
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
				backgroundColor={newUser ? theme.purple2 : theme.green2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={`como você prefere ${newUser ? 'criar uma conta' : 'entrar'}?`}
					highlightedWords={newUser ? ['criar', 'uma', 'conta'] : ['entrar']}
					fontSize={16}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white3} justifyContent={'center'}>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.green3}
									SecondSvgIcon={SmartphoneWhiteIcon}
									svgIconScale={['50%', '30%']}
									label={'telefone'}
									highlightedWords={['telefone']}
									labelColor={theme.white3}
									onPress={performSigninWithCellNumber}
								/>
								<VerticalSpacing height={relativeScreenHeight(5)} />
								<PrimaryButton
									color={theme.white3}
									SecondSvgIcon={GoogleWhiteIcon}
									svgIconScale={['50%', '30%']}
									labelColor={theme.black4}
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
