import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '@common/theme'

import { WhoWeAreIncomeScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '@components/_cards/DefaultCardContainer'
import { DescriptionWithLeftTracing } from '@components/DescriptionWithLeftTracing'
import {
	Body,
	Container,
	Header,
	Sigh,
	Title,
	TextMedium,
	ButtonContainer,
} from './styles'

function WhoWeAreIncome({ navigation }: WhoWeAreIncomeScreenProps) {
	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
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
					<Title>{'gerar renda.'}</Title>
					<TextMedium>
						{'o 1% mais rico tem quase 50% da riqueza brasileira'}
					</TextMedium>
					<DescriptionWithLeftTracing
						text={
							'por meio de um marketplace similar ao ifood/amazon/uber/linkedin, você e outras pessoas podem vender, comprar e encontrar vagas de tudo que é tipo de trabalho.'
						}
					/>
					<TextMedium>
						{
							'quando você faz isso, uma parte do dinheiro é usado em iniciativas sociais nas periferias.'
						}
					</TextMedium>
					<Sigh />
				</DefaultCardContainer>
				<Sigh />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={'tem mais!'}
						fontSize={20}
						onPress={() => navigation.navigate('WhoWeAreCulture')}
					/>
				</ButtonContainer>
			</Body>
		</Container>
	)
}

export { WhoWeAreIncome }
