import React, { useContext, useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { Id } from '@domain/entities/globalTypes'

import { SmasRepositoryAdapter } from '@data/smas/SmasRepositoryAdapter'

import { AlertContext } from '@contexts/AlertContext'
import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { NotificationSettingsScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { Container, HeaderLinkCardContainer } from './styles'
import BellWhiteIcon from '@assets/icons/bell-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmasAdapter } from '@adapters/smas/SmasAdapter'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { HeaderLinkCard } from '@components/_cards/HeaderLinkCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { InsertNisModal } from '@components/_modals/InsertNisModal'
import { Loader } from '@components/Loader'

const { validateNIS, smasNisHasLinkedWithUser, getNisFromLocalRepository, setNisOnLocalRepository, setSmasPushNotificationState } = SmasAdapter()

function NotificationSettings({ route, navigation }: NotificationSettingsScreenProps) {
	const { pushNotificationEnabled, setPushNotificationState, chatUserHasTokenNotification } = useContext(ChatContext)

	const { updateNotificationState } = useContext(AlertContext)
	const { userDataContext } = useContext(AuthContext)

	const [userNis, setUserNis] = useState('')
	const [notificationIsEnabled, setNotificationIsEnabled] = useState(pushNotificationEnabled)
	const [smasMessagesIsEnabled, setSmasMessagesIsEnabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [insertNisModalIsVisible, setInsertNisModalIsVisible] = useState(false)

	useEffect(() => {
		checkNotificationStates()
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const checkNotificationStates = async () => {
		setIsLoading(true)
		await checkChatNotificationState()
		await checkSmasMessagesState()
		setIsLoading(false)
	}

	const checkChatNotificationState = async () => {
		const userNotificationIsEnabled = await chatUserHasTokenNotification()
		setNotificationIsEnabled(userNotificationIsEnabled)
	}

	const checkSmasMessagesState = async (nis?: string) => {
		const currentNis = nis || await getNisFromLocalRepository(SmasRepositoryAdapter)
		const smasMessagesState = await smasNisHasLinkedWithUser(currentNis, SmasRepositoryAdapter)

		setSmasMessagesIsEnabled(smasMessagesState)
		setUserNis(currentNis)
	}

	const toggleNotificationState = async () => {
		try {
			setIsLoading(true)
			await setPushNotificationState(!notificationIsEnabled)
			setNotificationIsEnabled(!notificationIsEnabled)
			updateNotificationState({ configNotificationButton: notificationIsEnabled })
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		} catch (err) {
			setIsLoading(false)
		}
	}

	const toggleMessagesSmasState = async (inputedNis?: string) => {
		const newState = !smasMessagesIsEnabled
		try {
			setIsLoading(true)

			if (newState) {
				if (!inputedNis || (inputedNis && inputedNis.trim().length !== 11)) throw new Error('NIS inválido!')
				setSmasPushNotificationState(newState, inputedNis || userNis, userDataContext.userId as Id, SmasRepositoryAdapter)
				setUserNis(inputedNis)
				await setNisOnLocalRepository(inputedNis, SmasRepositoryAdapter)
			} else {
				setSmasPushNotificationState(newState, inputedNis || userNis, userDataContext.userId as Id, SmasRepositoryAdapter)
				setUserNis('')
				await setNisOnLocalRepository('', SmasRepositoryAdapter)
			}

			setSmasMessagesIsEnabled(newState)
			setTimeout(() => {
				setIsLoading(false)
			}, 500)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
	}

	const toggleInsertNisModalVisibility = () => setInsertNisModalIsVisible(!insertNisModalIsVisible)

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<InsertNisModal
				initialInputValue={userNis}
				visibility={insertNisModalIsVisible}
				validateNis={validateNIS}
				onPressButton={toggleMessagesSmasState}
				closeModal={toggleInsertNisModalVisibility}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<HeaderLinkCardContainer>
					<HeaderLinkCard
						title={'notificações⠀'}
						value={'ative suas notificações e fique por dentro de tudo'}
						highlightedWords={['ative', 'desligadas', 'notificações⠀']}
						SvgIcon={BellWhiteIcon}
					/>
				</HeaderLinkCardContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2}>
				{
					isLoading
						? (
							<Loader />
						)
						: (
							<>
								<OptionButton
									label={`${notificationIsEnabled ? 'desligar' : 'ligar'} notificações do chat`}
									highlightedWords={['chat', 'ligar', 'desligar']}
									labelSize={17}
									relativeHeight={relativeScreenHeight(15)}
									SvgIcon={notificationIsEnabled ? XWhiteIcon : CheckWhiteIcon}
									svgIconScale={['50%', '50%']}
									leftSideColor={notificationIsEnabled ? theme.red3 : theme.green3}
									leftSideWidth={'22%'}
									onPress={toggleNotificationState}
								/>
								<OptionButton
									label={`${smasMessagesIsEnabled ? 'desabilitar' : 'habilitar'} mensagens de benefícios no chat`}
									highlightedWords={['chat', 'habilitar', 'desabilitar']}
									labelSize={17}
									shortDescription={userNis ? `NIS: ${userNis}` : ''}
									shortDescriptionHighlightedWords={[userNis]}
									relativeHeight={relativeScreenHeight(15)}
									SvgIcon={smasMessagesIsEnabled ? XWhiteIcon : CheckWhiteIcon}
									svgIconScale={['50%', '50%']}
									leftSideColor={smasMessagesIsEnabled ? theme.red3 : theme.green3}
									leftSideWidth={'22%'}
									onPress={smasMessagesIsEnabled ? toggleMessagesSmasState : toggleInsertNisModalVisibility}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { NotificationSettings }
