import React from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, ContainerContent, Header, Sigh, BoldPhrase } from './styles'
import { theme } from '../../../common/theme'

import { WhoWeAreScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '../../../components/_cards/DefaultCardContainer'
import { DescriptionWithLeftTracing } from '../../../components/DescriptionWithLeftTracing'

function WhoWeAre({ navigation }: WhoWeAreScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={'quem somos'}
					highlightedWords={['somos']}
				/>
			</Header>
			<Body>
				<DefaultCardContainer flex={1}>
					<ContainerContent>
						<BoldPhrase>{'o corre. é trabalho,'}</BoldPhrase>
						<BoldPhrase>{'o corre. é cultura,'}</BoldPhrase>
						<BoldPhrase>{'o corre. é transformação'}</BoldPhrase>
						<Sigh />
						<DescriptionWithLeftTracing
							text={'somos uma organização social que usa todos os lucros para combater desigualdades sociais nas periferias.'}
						/>
					</ContainerContent>
				</DefaultCardContainer>
				<Sigh />
				<PrimaryButton
					color={theme.orange3}
					label={'como fazemos isso?'}
					fontSize={20}
					onPress={() => navigation.navigate('WhoWeAreIncome')}
				/>
			</Body>
		</Container >
	)
}

export { WhoWeAre }
