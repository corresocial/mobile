import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import GoogleWhiteIcon from '../../../assets/icons/google-white.svg'
import AppleWhiteIcon from '../../../assets/icons/apple-white.svg'
import SmartphoneWhiteIcon from '../../../assets/icons/smartphone-white.svg'

import { SelectAuthMethodScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'
import { getEnvVars } from '../../../../environment'
import { generateGoogleAuthCredential } from '../../../services/firebase/user/generateGoogleAuthCredential'
import { signinByCredential } from '../../../services/firebase/user/signingByCredential'
import { AuthContext } from '../../../contexts/AuthContext'
import { userExists } from '../../../services/firebase/user/userExists'
import { SocialLoginAlertModal } from '../../../components/_modals/SocialLoginAlertModal'

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

	const [authenticatedUser, setAuthenticatedUser] = React.useState({ userId: '', email: '' })
	const [socialLoginAlertModalIsVisible, setSocialLoginAlertModalIsVisible] = React.useState(false)
	const [tokenGoogle, setTokenGoogle] = React.useState<string | undefined>()
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
		navigation.navigate('InsertCellNumber')
	}

	const performSigninWithGoogle = async () => {
		try {
			if (tokenGoogle) {
				const googleCredential = generateGoogleAuthCredential(tokenGoogle)
				const { userId, email } = await signinByCredential(googleCredential)

				if (userId && email) {
					const userAlreadyExists = await userExists(userId)

					console.log('newUser: ', newUser)
					console.log('UserAlreadyExists: ', userAlreadyExists)

					if (!newUser && !userAlreadyExists) {
						console.log('Usuário não está cadastrado, quer cadastrar?')
						setAuthenticatedUser({ userId, email })
						toggleSocialLoginAlertModalVisibility()
						return
					}

					if (newUser && userAlreadyExists) {
						console.log('Usuário já está cadastrado, quer logar?')
						setAuthenticatedUser({ userId, email })
						toggleSocialLoginAlertModalVisibility()
						return
					}

					console.log('segue o fluxo')

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

	const performSigninWithApple = () => {
		console.log('performSigninWithApple')
	}

	const toggleSocialLoginAlertModalVisibility = () => {
		setSocialLoginAlertModalIsVisible((previousValue) => !previousValue)
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<SocialLoginAlertModal
				visibility={socialLoginAlertModalIsVisible}
				accountIdentifier={authenticatedUser.email}
				registerMethod={newUser}
				closeModal={toggleSocialLoginAlertModalVisibility}
				onPressButton={newUser ? performLoginOnApp : navigateToCreateNewAccount}
			/>
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'como você prefere entrar?'}
					highlightedWords={['entrar']}
					fontSize={16}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2} justifyContent={'space-around'}>
				<PrimaryButton
					color={theme.green3}
					SecondSvgIcon={SmartphoneWhiteIcon}
					svgIconScale={['50%', '30%']}
					label={'telefone'}
					highlightedWords={['telefone']}
					labelColor={theme.white3}
					onPress={performSigninWithCellNumber}
				/>
				<PrimaryButton
					color={theme.white3}
					SecondSvgIcon={GoogleWhiteIcon}
					svgIconScale={['50%', '30%']}
					labelColor={theme.black4}
					label={`${newUser ? 'entrar' : 'continuar'} \ncom google`}
					highlightedWords={[newUser ? 'entrar' : 'continuar', '\ncom', 'google']}
					textAlign={'left'}
					onPress={performSigninWithGoogle}
				/>
				<PrimaryButton
					color={theme.white3}
					SecondSvgIcon={AppleWhiteIcon}
					svgIconScale={['50%', '30%']}
					labelColor={theme.black4}
					label={`${newUser ? 'entrar' : 'continuar'} \ncom apple`}
					highlightedWords={[newUser ? 'entrar' : 'continuar', '\ncom', 'apple']}
					textAlign={'left'}
					onPress={performSigninWithApple}
				/>
			</FormContainer>
		</Container >
	)
}

export { SelectAuthMethod }
