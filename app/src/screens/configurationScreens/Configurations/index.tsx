import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, Header } from './styles'
import { theme } from '../../../common/theme'

import { ConfigurationsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { ChatContext } from '../../../contexts/ChatContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { VerticalSigh } from '../../../components/VerticalSigh'

function Configurations({ navigation }: ConfigurationsScreenProps) {
	const { deleteLocaluser } = useContext(AuthContext)
	const { removeChatListeners } = useContext(ChatContext)

	const performLogout = () => {
		removeChatListeners()
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

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'configurações'}
				/>
			</Header>
			<Body>
				<PrimaryButton
					color={theme.white3}
					label={'quem somos'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['somos']}
					onPress={() => navigation.navigate('WhoWeAre')}
				/>
				<VerticalSigh />
				<PrimaryButton
					color={theme.white3}
					label={'nos ajude'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['ajude']}
					onPress={() => navigation.navigate('HelpUs')}
				/>
				<VerticalSigh />
				<PrimaryButton
					color={theme.white3}
					label={'fale conosco'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['conosco']}
					onPress={() => navigation.navigate('ContactUs')}
				/>
				<VerticalSigh />
				<PrimaryButton
					color={theme.white3}
					label={'assinatura corre.'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['corre']}
					onPress={performUserSubscription}
				/>
				<VerticalSigh />
				<PrimaryButton
					color={theme.white3}
					label={'privacidade e segurança'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['privacidade', 'segurança']}
					onPress={() => navigation.navigate('PrivacyAndSecurity')}
				/>
				<VerticalSigh />
				<PrimaryButton
					color={theme.red3}
					labelColor={theme.white3}
					label={'sair'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['sair']}
					onPress={performLogout}
				/>
				<VerticalSigh />
			</Body>
		</Container >
	)
}

export { Configurations }
