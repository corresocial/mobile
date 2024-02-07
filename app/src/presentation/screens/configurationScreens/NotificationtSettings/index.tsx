import React, { useContext, useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { SmasRepositoryAdapter } from '@data/smas/SmasRepositoryAdapter'

import { AlertContext } from '@contexts/AlertContext'
import { ChatContext } from '@contexts/ChatContext'

import { NotificationSettingsScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { PushNotificationService } from '@services/pushNotification/PushNotificationService'

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
import { Loader } from '@components/Loader'

function NotificationSettings({ route, navigation }: NotificationSettingsScreenProps) {
	const { smasUserHasTokenNotification, setSmasPushNotificationState } = SmasAdapter()

	const { pushNotificationEnabled, setPushNotificationState, chatUserHasTokenNotification } = useContext(ChatContext)
	const { updateNotificationState } = useContext(AlertContext)

	const [chatNotificationIsEnabled, setChatNotificationIsEnabled] = useState(pushNotificationEnabled)
	const [smasNotificationIsEnabled, setSmasNotificationIsEnabled] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkNotificationStates()
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const checkNotificationStates = async () => {
		setIsLoading(true)
		await checkChatNotificationState()
		await checkSmasNotificationState()
		setIsLoading(false)
	}

	const checkChatNotificationState = async () => {
		const userNotificationIsEnabled = await chatUserHasTokenNotification()
		setChatNotificationIsEnabled(userNotificationIsEnabled)
	}

	const checkSmasNotificationState = async () => {
		const userNotificationIsEnabled = await smasUserHasTokenNotification('', SmasRepositoryAdapter)
		setSmasNotificationIsEnabled(userNotificationIsEnabled)
	}

	const toggleChatNotificationState = async () => {
		try {
			setIsLoading(true)
			await setPushNotificationState(!chatNotificationIsEnabled)
			setChatNotificationIsEnabled(!chatNotificationIsEnabled)
			updateNotificationState({ configNotificationButton: chatNotificationIsEnabled })
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		} catch (err) {
			setIsLoading(false)
		}
	}

	const toggleSmasNotificationState = async () => {
		try {
			setIsLoading(true)
			setSmasNotificationIsEnabled(!smasNotificationIsEnabled)
			await setSmasPushNotificationState(!smasNotificationIsEnabled, '', SmasRepositoryAdapter, PushNotificationService)
			// updateNotificationState({ configNotificationButton: smasNotificationIsEnabled })
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		} catch (err) {
			setIsLoading(false)
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'40%'}
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
									label={`${chatNotificationIsEnabled ? 'desligar' : 'ligar'} notificações do chat`}
									highlightedWords={['chat', 'ligar', 'desligar']}
									labelSize={17}
									relativeHeight={relativeScreenHeight(15)}
									SvgIcon={chatNotificationIsEnabled ? XWhiteIcon : CheckWhiteIcon}
									svgIconScale={['50%', '50%']}
									leftSideColor={chatNotificationIsEnabled ? theme.red3 : theme.green3}
									leftSideWidth={'22%'}
									onPress={toggleChatNotificationState}
								/>
								<OptionButton
									label={`${smasNotificationIsEnabled ? 'desligar' : 'ligar'} notificações do CRAS`}
									highlightedWords={['CRAS', 'ligar', 'desligar']}
									labelSize={17}
									relativeHeight={relativeScreenHeight(15)}
									SvgIcon={smasNotificationIsEnabled ? XWhiteIcon : CheckWhiteIcon}
									svgIconScale={['50%', '50%']}
									leftSideColor={smasNotificationIsEnabled ? theme.red3 : theme.green3}
									leftSideWidth={'22%'}
									onPress={toggleSmasNotificationState}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { NotificationSettings }
