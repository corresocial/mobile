import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, Header, Sigh } from './styles'
import { theme } from '../../../common/theme'

import { ConfigurationsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'

function Configurations({ route, navigation }: ConfigurationsScreenProps) {
	const { deleteLocaluser } = useContext(AuthContext)

	const performLogout = () => {
		deleteLocaluser()
		navigation.navigate('AcceptAndContinue' as any)
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
				<Sigh />
				<PrimaryButton
					color={theme.white3}
					label={'nos ajude'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['ajude']}
					onPress={() => navigation.navigate('HelpUs')}
				/>
				<Sigh />
				<PrimaryButton
					color={theme.white3}
					label={'fale conosco'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['conosco']}
					onPress={() => { }}
				/>
				<Sigh />
				<PrimaryButton
					color={theme.white3}
					label={'privacidade e segurança'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['privacidade', 'segurança']}
					onPress={() => { }}
				/>
				<Sigh />
				<PrimaryButton
					color={theme.red2}
					label={'sair'}
					fontSize={20}
					justifyContent={'flex-start'}
					textAlign={'left'}
					highlightedWords={['sair']}
					onPress={performLogout}
				/>
				<Sigh />
			</Body>
		</Container >
	)
}

export { Configurations }
