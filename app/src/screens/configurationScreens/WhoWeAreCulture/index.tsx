import React from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, Header, Sigh, Title, TextMedium, ButtonContainer } from './styles'
import { theme } from '../../../common/theme'

import { WhoWeAreCultureScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '../../../components/_cards/DefaultCardContainer'
import { DescriptionWithLeftTracing } from '../../../components/DescriptionWithLeftTracing'

function WhoWeAreCulture({ navigation }: WhoWeAreCultureScreenProps) {
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
					<Sigh />
					<Title>{'gerar cultura.'}</Title>
					<TextMedium>{'conteúdo de qualidade e valor para todos!'}</TextMedium>
					<DescriptionWithLeftTracing
						text={'aqui temos cursos, séries, leituras, galerias de arte e eventos, tudo escolhido a dedo por pessoas apaixonadas pela arte brasileira'}
					/>
					<TextMedium>{'além de gerar renda, auxiliamos na formação social e cultural de todos'}</TextMedium>
					<Sigh />
				</DefaultCardContainer>
				<Sigh />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={'só mais uma coisa'}
						fontSize={20}
						onPress={() => navigation.navigate('WhoWeAreTransformation')}
					/>
				</ButtonContainer>
			</Body>
		</Container >
	)
}

export { WhoWeAreCulture }
