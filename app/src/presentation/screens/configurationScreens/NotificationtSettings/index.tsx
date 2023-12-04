import React, { useContext, useEffect, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { AlertContext } from '@contexts/AlertContext'
import { ChatContext } from '@contexts/ChatContext'

import { Container, HeaderLinkCardContainer } from './styles'
import BellWhiteIcon from '@assets/icons/bell-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '../../../components/_buttons/BackButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { HeaderLinkCard } from '../../../components/_cards/HeaderLinkCard'
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { Loader } from '../../../components/Loader'
import { NotificationSettingsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

function NotificationSettings({ route, navigation }: NotificationSettingsScreenProps) {
	const { pushNotificationEnabled, setPushNotificationState, userHasTokenNotification } = useContext(ChatContext)
	const { updateNotificationState } = useContext(AlertContext)

	const [notificationIsEnabled, setNotificationIsEnabled] = useState(pushNotificationEnabled)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkRemoteNotificationState()
	}, [])

	const navigateBackwards = () => navigation.goBack()

	const checkRemoteNotificationState = async () => {
		const userNotificationIsEnabled = await userHasTokenNotification()
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
			}, 2000)
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
						value={`suas notificações estão ${notificationIsEnabled ? 'ligadas' : 'desligadas'}`}
						highlightedWords={['ligadas', 'desligadas', 'notificações⠀']}
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
							<OptionButton
								label={`${notificationIsEnabled ? 'desligar' : 'ligar'} notificações`}
								highlightedWords={['notificações', 'ligar', 'desligar']}
								labelSize={17}
								relativeHeight={relativeScreenHeight(15)}
								SvgIcon={notificationIsEnabled ? XWhiteIcon : CheckWhiteIcon}
								svgIconScale={['50%', '50%']}
								leftSideColor={notificationIsEnabled ? theme.red3 : theme.green3}
								leftSideWidth={'22%'}
								onPress={toggleNotificationState}
							/>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { NotificationSettings }
