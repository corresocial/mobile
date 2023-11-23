import { Platform, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'

import { Container, HeaderLinkCardContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import BellWhiteIcon from '../../../assets/icons/bell-white.svg'

import { NotificationSettingsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { HeaderLinkCard } from '../../../components/_cards/HeaderLinkCard'
import { BackButton } from '../../../components/_buttons/BackButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { ChatContext } from '../../../contexts/ChatContext'

function NotificationSettings({ route, navigation }: NotificationSettingsScreenProps) {
	const { pushNotificationEnabled, setPushNotificationState } = useContext(ChatContext)

	const [notificationIsEnabled, setNotificationIsEnabled] = useState(pushNotificationEnabled)

	const toggleNotificationState = async () => {
		setPushNotificationState(!notificationIsEnabled)
		setNotificationIsEnabled(!notificationIsEnabled)
	}

	const navigateBackwards = () => navigation.goBack()

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
			</FormContainer>
		</Container>
	)
}

export { NotificationSettings }
