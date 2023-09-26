import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

import { UserCredential } from 'firebase/auth'
import { relativeScreenHeight } from '../../../common/screenDimensions'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'
import PlusWhiteIcon from '../../../assets/icons/plus-white.svg'
import TrashWhiteIcon from '../../../assets/icons/trash-white.svg'
import SmartphoneWhiteIcon from '../../../assets/icons/smartphone-white.svg'
import GoogleWhiteIcon from '../../../assets/icons/google-white.svg'

import { unlinkUserCredential } from '../../../services/firebase/user/unlinkUserCredential'
import { EntryMethodManagementScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { EditCard } from '../../../components/_cards/EditCard'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { getPrivateContacts } from '../../../services/firebase/user/getPrivateContacts'
import { AuthContext } from '../../../contexts/AuthContext'
import { Id } from '../../../services/firebase/types'
import { linkUserCredential } from '../../../services/firebase/user/linkUserCredential'
import { getEnvVars } from '../../../../environment'
import { generateGoogleAuthCredential } from '../../../services/firebase/user/generateGoogleAuthCredential'
import { updateUserPrivateData } from '../../../services/firebase/user/updateUserPrivateData'
import { SocialLoginAlertModal } from '../../../components/_modals/SocialLoginAlertModal'
import { Loader } from '../../../components/Loader'
import { DefaultConfirmationModal } from '../../../components/_modals/DefaultConfirmationModal'

WebBrowser.maybeCompleteAuthSession()
const { AUTH_EXPO_CLIENT_ID, AUTH_ANDROID_CLIENT_ID, AUTH_IOS_CLIENT_ID } = getEnvVars()

function EntryMethodManagement({ navigation }: EntryMethodManagementScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const keys = {
		expoClientId: AUTH_EXPO_CLIENT_ID,
		androidClientId: AUTH_ANDROID_CLIENT_ID,
		iosClientId: AUTH_IOS_CLIENT_ID
	}

	const [tokenGoogle, setTokenGoogle] = useState<string | undefined>()
	const [userPrivateContacts, setUserPrivateContacts] = useState({ cellNumber: '', email: '' })
	const [request, response, promptAsyncGoogle] = Google.useAuthRequest(keys, {
		projectNameForProxy: '@corresocial/corresocial'
	})

	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [socialLoginAlertModalIsVisible, setSocialLoginAlertModalIsVisible] = useState(false)
	const [confirmationModalIsVisible, setConfirmationModalIsVisible] = useState(false)

	useEffect(() => {
		loadPrivateContacts()
	}, [])

	const loadPrivateContacts = async () => {
		const userContacts = await getPrivateContacts(userDataContext.userId as Id)
		console.log(userContacts)
		setUserPrivateContacts(userContacts)
	}

	useEffect(() => {
		if (response?.type === 'success') {
			const { authentication } = response
			setTokenGoogle(authentication?.accessToken)
		}

		if (tokenGoogle) {
			performSigninWithGoogle()
		}
	}, [response, tokenGoogle])

	const performSigninWithGoogle = async () => {
		try {
			setIsLoading(true)
			setHasError(false)
			if (tokenGoogle) {
				const googleCredential = generateGoogleAuthCredential(tokenGoogle)

				const registredEmail = userPrivateContacts.email

				if (registredEmail) {
					console.log('Unlink')
					await unlinkUserCredential(googleCredential)
					await updateUserPrivateData({ email: '' }, userDataContext.userId as Id, 'contacts')
					setUserPrivateContacts({ ...userPrivateContacts, email: '' })
					navigateToLinkResultScreen(false, registredEmail)
				} else {
					console.log('Link')
					const linkedUser: UserCredential['user'] = await linkUserCredential(googleCredential)

					if (!linkedUser) throw new Error('Houve algum erro ao vincular')

					await updateUserPrivateData({ email: linkedUser.email || '' }, userDataContext.userId as Id, 'contacts')
					setUserPrivateContacts({ ...userPrivateContacts, email: linkedUser.email || '' })
					navigateToLinkResultScreen(true, linkedUser.email)
				}
			} else {
				await promptAsyncGoogle({ projectNameForProxy: '@corresocial/corresocial' })
			}
		} catch (error: any) {
			console.log(error && error.message)
			if (error && error.message === 'auth/provider-already-linked') {
				toggleSocialLoginAlertModalVisibility()
				return
			}
			setHasError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const navigateToLinkResultScreen = (wasLinked: boolean, accountIdentifier?: string | null) => {
		navigation.navigate('LinkingAccountResult', { accountIdentifier, wasLinked })
	}

	const toggleSocialLoginAlertModalVisibility = () => {
		setSocialLoginAlertModalIsVisible(!socialLoginAlertModalIsVisible)
	}

	const toggleConfirmationModalVisibility = () => {
		setConfirmationModalIsVisible(!confirmationModalIsVisible)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultConfirmationModal
				visibility={confirmationModalIsVisible}
				title={'desvincular'}
				text={'você tem certeza que deseja desvincular esta conta?'}
				highlightedWords={['desvincular', 'esta', 'conta']}
				buttonKeyword={'desvincular'}
				closeModal={toggleConfirmationModalVisibility}
				onPressButton={performSigninWithGoogle}
			/>
			<SocialLoginAlertModal
				visibility={socialLoginAlertModalIsVisible}
				accountIdentifier={userPrivateContacts.email}
				registerMethod
				linking
				closeModal={toggleSocialLoginAlertModalVisibility}
				onPressButton={() => { }}
			/>
			<DefaultHeaderContainer
				flexDirection={'row'}
				relativeHeight={relativeScreenHeight(26)}
				backgroundColor={theme.white3}
				borderBottomWidth={0}
				centralized
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={'métodos \nde entrada'}
					titleFontSize={18}
					height={relativeScreenHeight(10)}
					highlightedWords={['entrada']}
					color={theme.white3}
					SvgIcon={DescriptionWhiteIcon}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2}>
				{
					isLoading
						? <Loader />
						: (
							<>
								<EditCard // TODO Check edit card behavior
									title={'número de telefone'}
									RightIcon={PlusWhiteIcon}
									SecondSvgIcon={SmartphoneWhiteIcon}
									value={userPrivateContacts.cellNumber}
									pressionable
									onEdit={() => console.log('press')}
								/>
								<EditCard
									title={'conta google'}
									RightIcon={userPrivateContacts.email ? TrashWhiteIcon : PlusWhiteIcon}
									SecondSvgIcon={GoogleWhiteIcon}
									value={userPrivateContacts.email}
									pressionable
									onEdit={toggleConfirmationModalVisibility}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { EntryMethodManagement }
