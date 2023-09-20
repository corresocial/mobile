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

WebBrowser.maybeCompleteAuthSession()
const { AUTH_EXPO_CLIENT_ID, AUTH_ANDROID_CLIENT_ID, AUTH_IOS_CLIENT_ID } = getEnvVars()

function SelectAuthMethod({ navigation }: SelectAuthMethodScreenProps) {
	const { setRemoteUserOnLocal } = useContext(AuthContext)

	const keys = {
		expoClientId: AUTH_EXPO_CLIENT_ID,
		androidClientId: AUTH_ANDROID_CLIENT_ID,
		iosClientId: AUTH_IOS_CLIENT_ID
	}

	const [tokenGoogle, setTokenGoogle] = React.useState<string | undefined>()
	const [request, response, promptAsyncGoogle] = Google.useAuthRequest(keys, {
		projectNameForProxy: '@corresocial/corresocial'
	})

	React.useEffect(() => {
		if (response?.type === 'success') {
			const { authentication } = response
			setTokenGoogle(authentication?.accessToken)
		}
	}, [response])

	const navigateBackwards = () => navigation.goBack()

	const performSigninWithCellNumber = async () => {
		navigation.navigate('InsertCellNumber')
	}

	const performSigninWithGoogle = async () => {
		try {
			if (tokenGoogle) {
				const googleCredential = generateGoogleAuthCredential(tokenGoogle)
				const { userId, email: loggedEmail } = await signinByCredential(googleCredential)

				if (userId) {
					const userLoadedOnContext = await setRemoteUserOnLocal(userId)

					console.log(`UserHasAccount: ${userLoadedOnContext}`)
					if (!userLoadedOnContext) { // if (!userLoadedOnContext) {
						navigation.navigate('InsertName', {
							userIdentification: { uid: userId },
							email: loggedEmail || '',
							cellNumber: ''
						})
						return
					}

					navigation.reset({
						index: 0,
						routes: [{
							name: 'UserStack',
							params: { tourPerformed: true }
						}],
					})
				}
			} else {
				await promptAsyncGoogle({ projectNameForProxy: '@corresocial/corresocial' })
			}
		} catch (error) {
			console.log(error)
		}
	}

	const performSigninWithApple = () => {
		console.log('performSigninWithApple')
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'como você prefere entrar?'}
					highlightedWords={['entrar']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2} justifyContent={'space-around'}>
				<PrimaryButton
					color={theme.green3}
					SecondSvgIcon={SmartphoneWhiteIcon}
					svgIconScale={['50%', '25%']}
					label={'telefone'}
					highlightedWords={['telefone']}
					labelColor={theme.white3}
					onPress={performSigninWithCellNumber}
				/>
				<PrimaryButton
					color={theme.purple3}
					SecondSvgIcon={GoogleWhiteIcon}
					svgIconScale={['50%', '25%']}
					labelColor={theme.white3}
					label={'google'}
					highlightedWords={['google']}
					onPress={performSigninWithGoogle}
				/>
				<PrimaryButton
					color={theme.purple3}
					SecondSvgIcon={AppleWhiteIcon}
					svgIconScale={['50%', '25%']}
					labelColor={theme.white3}
					label={'apple'}
					highlightedWords={['apple']}
					onPress={performSigninWithApple}
				/>
			</FormContainer>
		</Container >
	)
}

export { SelectAuthMethod }
