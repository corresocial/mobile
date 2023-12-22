import React, { useContext, useState } from 'react'
import { Linking, StatusBar } from 'react-native'

import { AlertContext } from '@contexts/AlertContext/index'
import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { ConfigurationsScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { UserStackParamList } from '@routes/Stack/UserStack/types'
import { Id } from '@services/firebase/types'

import { auth } from '@services/firebase'
import { clearOfflinePosts } from '@utils/offlinePost'

import { Body, Container, Header } from './styles'
import BellAlertWhiteIcon from '@assets/icons/bell-alert-white.svg'
import BellWhiteIcon from '@assets/icons/bell-white.svg'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DescriptionAlertWhiteIcon from '@assets/icons/description-alert-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import EyeDashedWhiteIcon from '@assets/icons/eyeDashed-white.svg'
import HandOnHeartWhiteIcon from '@assets/icons/handOnHeart-white.svg'
import HandOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import ShareWhiteIcon from '@assets/icons/share-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { ChatAdapter } from '@adapters/chat/ChatAdapter'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SubscriptionButton } from '@components/_buttons/SubscriptionButton'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { updateUserTokenNotification } = ChatAdapter()

function Configurations({ navigation }: ConfigurationsScreenProps) {
	const { notificationState, updateNotificationState } = useContext(AlertContext)
	const { userDataContext, deleteLocaluser } = useContext(AuthContext)
	const { removeChatListeners } = useContext(ChatContext)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)

	const toggleDefaultConfirmationModalVisibility = () => {
		setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible)
	}

	const performLogout = async () => {
		removeChatListeners()
		await updateUserTokenNotification(userDataContext.userId as Id, '')
		await deleteLocaluser()
		await clearOfflinePosts()
		await auth.signOut()
		navigateToInitialScreen()
	}

	const navigateToInitialScreen = () => {
		navigation.reset({
			index: 0,
			routes: [{
				name: 'SelectAuthRegister' as any, // TODO Type
				params: {
					userId: ''
				}
			}]
		})
	}

	const performUserSubscription = () => {
		navigateToScreen('SelectSubscriptionRange')
	}

	const shareMessage = () => {
		share('oi, já conhece o https://corre.social/ !? meu novo app favorito')
	}

	const openLink = async (link: string) => {
		const validUrl = await Linking.canOpenURL(link)
		if (validUrl) {
			Linking.openURL(link)
		} else {
			console.log('URL inválida')
		}
	}

	const navigateToScreen = (screenName: keyof UserStackParamList, alertPropForUpdate?: string) => {
		if (alertPropForUpdate) {
			updateNotificationState({ [alertPropForUpdate]: false })
		}

		navigation.navigate(screenName)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'sair'}
				text={'você tem certeza que deseja sair da sua conta?'}
				highlightedWords={['sair', 'da', 'sua', 'conta']}
				buttonKeyword={'sair'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={performLogout}
			/>
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'configurações'}
				/>
			</Header>
			<Body
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingVertical: relativeScreenWidth(4),
					paddingHorizontal: relativeScreenWidth(5)
				}}
			>
				<SubscriptionButton customTitle={'assinatura corre.'} onPress={performUserSubscription} />
				<VerticalSpacing />
				<OptionButton
					label={'corres concluídos'}
					highlightedWords={['concluídos']}
					labelSize={18}
					relativeHeight={relativeScreenHeight(9)}
					SvgIcon={CheckWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigateToScreen('ViewCompletedPosts')}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'notificações'}
					highlightedWords={['notificações']}
					labelSize={18}
					relativeHeight={relativeScreenHeight(9)}
					SvgIcon={notificationState.configNotificationButton ? BellAlertWhiteIcon : BellWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigateToScreen('NotificationSettings')}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'métodos de login'}
					highlightedWords={['métodos', 'de', 'login']}
					labelSize={18}
					relativeHeight={relativeScreenHeight(9)}
					SvgIcon={notificationState.configNotificationEntryMethod ? DescriptionAlertWhiteIcon : DescriptionWhiteIcon}
					svgIconScale={notificationState.configNotificationEntryMethod ? ['60%', '60%'] : ['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigateToScreen('EntryMethodManagement', 'configNotificationEntryMethod')}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'quem somos'}
					highlightedWords={['quem', 'somos']}
					labelSize={18}
					relativeHeight={relativeScreenHeight(9)}
					SvgIcon={QuestionMarkWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigateToScreen('WhoWeAre')}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'fale conosco'}
					highlightedWords={['fale', 'conosco']}
					relativeHeight={relativeScreenHeight(9)}
					labelSize={18}
					SvgIcon={ChatWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigateToScreen('ContactUs')}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'faça uma doação'}
					highlightedWords={['faça', 'uma', 'doação']}
					relativeHeight={relativeScreenHeight(9)}
					labelSize={18}
					SvgIcon={HandOnMoneyWhiteIcon}
					svgIconScale={['75%', '75%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={performUserSubscription}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'seja voluntário'}
					highlightedWords={['seja', 'voluntário']}
					relativeHeight={relativeScreenHeight(9)}
					labelSize={18}
					SvgIcon={HandOnHeartWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => openLink('https://voluntariado.corre.social/')}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'compartilhe'}
					highlightedWords={['compartilhe']}
					relativeHeight={relativeScreenHeight(9)}
					labelSize={18}
					SvgIcon={ShareWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={shareMessage}
				/>
				<VerticalSpacing />
				<OptionButton
					label={'privacidade \ne segurança'}
					highlightedWords={['privacidade', 'segurança']}
					relativeHeight={relativeScreenHeight(11)}
					labelSize={18}
					SvgIcon={EyeDashedWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigateToScreen('PrivacyAndSecurity')}
				/>
				<VerticalSpacing />
				<PrimaryButton
					color={theme.red3}
					labelColor={theme.white3}
					label={'sair'}
					highlightedWords={['sair']}
					fontSize={20}
					SvgIcon={XWhiteIcon}
					onPress={toggleDefaultConfirmationModalVisibility}
				/>
				<VerticalSpacing height={relativeScreenHeight(8)} />
			</Body>
		</Container >
	)
}

export { Configurations }
