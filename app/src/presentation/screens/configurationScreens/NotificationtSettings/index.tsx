import React, { useContext, useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { AlertContext } from '@contexts/AlertContext'
import { ChatContext } from '@contexts/ChatContext'

import { NotificationSettingsScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { Container, HeaderLinkCardContainer } from './styles'
import BellWhiteIcon from '@assets/icons/bell-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { OptionButton } from '@components/_buttons/OptionButton'
import { HeaderLinkCard } from '@components/_cards/HeaderLinkCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { Loader } from '@components/Loader'

function NotificationSettings({ route, navigation }: NotificationSettingsScreenProps) {
	const { pushNotificationEnabled, setPushNotificationState, chatUserHasTokenNotification } = useContext(ChatContext)
	const { updateNotificationState } = useContext(AlertContext)

	const [notificationIsEnabled, setNotificationIsEnabled] = useState(pushNotificationEnabled)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkNotificationStates()
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const checkNotificationStates = async () => {
		setIsLoading(true)
		await checkChatNotificationState()
		setIsLoading(false)
	}

	const checkChatNotificationState = async () => {
		const userNotificationIsEnabled = await chatUserHasTokenNotification()
		setNotificationIsEnabled(userNotificationIsEnabled)
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

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { NotificationSettings }
