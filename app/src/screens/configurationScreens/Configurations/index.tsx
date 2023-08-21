import React, { useContext } from 'react'
import { Linking, StatusBar } from 'react-native'

import { Body, Container, Header } from './styles'
import { theme } from '../../../common/theme'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import ChatWhiteIcon from '../../../assets/icons/chatTabIconInactive.svg'
import HandOnMoneyWhiteIcon from '../../../assets/icons/handOnMoney-white.svg'
import HandOnHeartWhiteIcon from '../../../assets/icons/handOnHeart-white.svg'
import ShareWhiteIcon from '../../../assets/icons/share-white.svg'
import EyeDashedWhiteIcon from '../../../assets/icons/eyeDashed-white.svg'

import { ConfigurationsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { ChatContext } from '../../../contexts/ChatContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { getAndUpdateUserToken } from '../../../services/firebase/chat/getAndUpdateUserToken'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { Id } from '../../../services/firebase/types'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { SubscriptionButton } from '../../../components/_buttons/SubscriptionButton'
import { share } from '../../../common/share'

function Configurations({ navigation }: ConfigurationsScreenProps) {
	const { userDataContext, deleteLocaluser } = useContext(AuthContext)
	const { removeChatListeners } = useContext(ChatContext)

	const performLogout = () => {
		removeChatListeners()
		getAndUpdateUserToken(userDataContext.userId as Id, null)
		deleteLocaluser()
		navigateToInitialScreen()
	}

	const navigateToInitialScreen = () => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'AcceptAndContinue' as any }]
		})
	}

	const performUserSubscription = () => {
		navigation.navigate('SelectSubscriptionRange')
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

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
				<VerticalSigh />
				<OptionButton
					label={'quem somos'}
					highlightedWords={['quem', 'somos']}
					labelSize={18}
					relativeHeight={relativeScreenHeight(9)}
					SvgIcon={QuestionMarkWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigation.navigate('WhoWeAre')}
				/>
				<VerticalSigh />
				<OptionButton
					label={'fale conosco'}
					highlightedWords={['fale', 'conosco']}
					relativeHeight={relativeScreenHeight(9)}
					labelSize={18}
					SvgIcon={ChatWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigation.navigate('ContactUs')}
				/>
				<VerticalSigh />
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
				<VerticalSigh />
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
				<VerticalSigh />
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
				<VerticalSigh />
				<OptionButton
					label={'privacidade \ne segurança'}
					highlightedWords={['privacidade', 'segurança']}
					relativeHeight={relativeScreenHeight(10)}
					labelSize={18}
					SvgIcon={EyeDashedWhiteIcon}
					svgIconScale={['50%', '50%']}
					leftSideColor={theme.orange3}
					leftSideWidth={'22%'}
					onPress={() => navigation.navigate('PrivacyAndSecurity')}
				/>
				<VerticalSigh />
				<PrimaryButton
					color={theme.red3}
					labelColor={theme.white3}
					label={'sair'}
					highlightedWords={['sair']}
					fontSize={20}
					SvgIcon={XWhiteIcon}
					onPress={performLogout}
				/>
				<VerticalSigh height={relativeScreenHeight(8)} />
			</Body>
		</Container >
	)
}

export { Configurations }
