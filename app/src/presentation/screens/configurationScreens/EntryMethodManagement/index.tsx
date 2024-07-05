import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import React, { useContext, useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { UserCredential } from 'firebase/auth'

import { PrivateUserEntity } from '@domain/user/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'

import { EntryMethodManagementScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { useAuthenticationService } from '@services/authentication/useAuthenticationService'

import { Container } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import EmptyWhiteIcon from '@assets/icons/empty-white.svg'
import GoogleWhiteIcon from '@assets/icons/google-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { EditCard } from '@components/_cards/EditCard'
import { InfoCard } from '@components/_cards/InfoCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { SocialLoginAlertModal } from '@components/_modals/SocialLoginAlertModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

import { getEnvVars } from '../../../../infrastructure/environment'

const { generateGoogleAuthCredential, linkAuthProvider, unlinkAuthProvider } = useAuthenticationService()

const { remoteStorage } = useUserRepository()

WebBrowser.maybeCompleteAuthSession()
const { AUTH_CLIENT_ID, AUTH_EXPO_CLIENT_ID, AUTH_ANDROID_CLIENT_ID, AUTH_IOS_CLIENT_ID } = getEnvVars()

function EntryMethodManagement({ navigation }: EntryMethodManagementScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const keys = {
		clientId: AUTH_CLIENT_ID,
		expoClientId: AUTH_EXPO_CLIENT_ID,
		androidClientId: AUTH_ANDROID_CLIENT_ID,
		iosClientId: AUTH_IOS_CLIENT_ID
	}

	const [tokenGoogle, setTokenGoogle] = useState<string | undefined>()
	const [userPrivateContacts, setUserPrivateContacts] = useState<PrivateUserEntity['contacts']>({ cellNumber: '', email: '' })
	// eslint-disable-next-line no-unused-vars
	const [request, response, promptAsyncGoogle] = Google.useAuthRequest(keys, {})

	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [socialLoginAlertModalIsVisible, setSocialLoginAlertModalIsVisible] = useState(false)
	const [unlinkPhoneConfirmationModalIsVisible, setUnlinkPhoneConfirmationModalIsVisible] = useState(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadPrivateContacts()
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		if (hasError) {
			toggleSocialLoginAlertModalVisibility()
		}
	}, [hasError])

	const loadPrivateContacts = async () => {
		const userContacts = await remoteStorage.getPrivateContacts(userDataContext.userId)
		setUserPrivateContacts(userContacts as PrivateUserEntity['contacts'])
	}

	useEffect(() => {
		if (response?.type === 'success') {
			const { authentication } = response
			setTokenGoogle(authentication?.accessToken)
		}

		if (tokenGoogle) {
			linkGoogleProvider()
		}
	}, [response, tokenGoogle])

	const canRemoveEntryMethod = () => {
		return userPrivateContacts && userPrivateContacts.cellNumber && userPrivateContacts.email && Platform.OS === 'android'
	}

	const editPhoneProvider = () => {
		const registredCellNumber = userPrivateContacts.cellNumber

		if (registredCellNumber) {
			if (!canRemoveEntryMethod()) return
			return toggleUnlinkPhoneConfirmationModalVisibility()
		}

		navigateToLinkPhoneProvider()
	}

	const navigateToLinkPhoneProvider = () => {
		navigation.navigate('InsertCellNumberLinkAccount')
	}

	const unlinkPhoneProvider = async () => {
		try {
			setIsLoading(true)
			setHasError(false)
			const registredCellNumber = userPrivateContacts.cellNumber

			if (registredCellNumber) {
				await unlinkAuthProvider('phone')
				await remoteStorage.updatePrivateContacts(
					userDataContext.userId,
					{ cellNumber: '' }
				)
				setUserPrivateContacts({ ...userPrivateContacts, cellNumber: '' })
				navigateToLinkResultScreen(false, registredCellNumber)
			}
		} catch (error: any) {
			console.log(error)
			setHasError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const editGoogleProvider = async () => {
		await linkGoogleProvider()
	}

	const linkGoogleProvider = async () => {
		try {
			setIsLoading(true)
			setHasError(false)

			if (tokenGoogle) {
				if (!tokenGoogle) return await promptAsyncGoogle()

				const googleCredential = generateGoogleAuthCredential(tokenGoogle)
				const linkedUser: UserCredential['user'] = await linkAuthProvider(googleCredential)

				if (!linkedUser) throw new Error('Houve algum erro ao vincular')

				await remoteStorage.updatePrivateContacts(
					userDataContext.userId,
					{ email: linkedUser.email ? linkedUser.email : '' }
				)

				setUserPrivateContacts({ ...userPrivateContacts, email: linkedUser.email ? linkedUser.email : '' })
				navigateToLinkResultScreen(true, linkedUser.email ? linkedUser.email : '')
			} else {
				await promptAsyncGoogle()
			}
		} catch (error: any) {
			console.log(error)
			if (error && (error.message === 'auth/provider-already-linked' || error.message === 'auth/credential-already-in-use"')) {
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

	const toggleUnlinkPhoneConfirmationModalVisibility = () => {
		setUnlinkPhoneConfirmationModalIsVisible(!unlinkPhoneConfirmationModalIsVisible)
	}

	const getFormatedCellNumber = () => {
		if (!userPrivateContacts.cellNumber) return ''
		const numbetWithoutCountryCode = userPrivateContacts.cellNumber.slice(3)
		const numberWithDDDSpace = `${numbetWithoutCountryCode.slice(0, 2)} ${numbetWithoutCountryCode.slice(2)}`
		return numberWithDDDSpace
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultConfirmationModal
				visibility={unlinkPhoneConfirmationModalIsVisible}
				title={'desvincular'}
				text={'não poderá mais acessar sua conta utilizando este telefone. \n\nvocê tem certeza que deseja desvincular este telefone da sua conta?'}
				highlightedWords={['você', 'desvincular', 'este', 'telefone', 'da', 'sua', 'conta', 'desvincular', 'esta', 'conta']}
				buttonKeyword={'desvincular'}
				closeModal={toggleUnlinkPhoneConfirmationModalVisibility}
				onPressButton={unlinkPhoneProvider}
			/>
			<SocialLoginAlertModal
				visibility={socialLoginAlertModalIsVisible}
				accountIdentifier={userPrivateContacts ? userPrivateContacts.email : ''}
				registerMethod
				linking
				hasError={hasError}
				closeModal={() => {
					setHasError(false)
					toggleSocialLoginAlertModalVisibility()
				}}
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
					title={'métodos \nde login'}
					titleFontSize={18}
					height={relativeScreenHeight(10)}
					highlightedWords={['entrada']}
					color={theme.white3}
					SvgIcon={DescriptionWhiteIcon}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2} >
				{
					isLoading
						? <Loader />
						: (
							<>
								<VerticalSpacing />
								<EditCard
									title={'número de telefone'}
									RightIcon={userPrivateContacts.cellNumber ? canRemoveEntryMethod() ? TrashWhiteIcon : EmptyWhiteIcon : PlusWhiteIcon}
									SecondSvgIcon={SmartphoneWhiteIcon}
									value={getFormatedCellNumber()}
									pressionable
									onEdit={editPhoneProvider}
								/>
								{
									Platform.OS === 'android' && (
										<EditCard
											title={'conta google'}
											RightIcon={userPrivateContacts && userPrivateContacts.email ? EmptyWhiteIcon : PlusWhiteIcon}
											SecondSvgIcon={GoogleWhiteIcon}
											value={userPrivateContacts && userPrivateContacts.email ? userPrivateContacts.email : ''}
											pressionable
											onEdit={userPrivateContacts && userPrivateContacts.email ? () => { } : editGoogleProvider}
										/>
									)
								}
								<VerticalSpacing />
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { EntryMethodManagement }
