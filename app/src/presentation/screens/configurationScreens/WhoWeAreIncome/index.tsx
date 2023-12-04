import React from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, Header, Title, ButtonContainer, Description, ContainerContent } from './styles'
import { theme } from '../../../common/theme'
import PlusWhiteIcon from '../../../assets/icons/plus-white.svg'

import { WhoWeAreIncomeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '../../../components/_cards/DefaultCardContainer'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { relativeScreenHeight } from '../../../common/screenDimensions'

function WhoWeAreIncome({ navigation }: WhoWeAreIncomeScreenProps) {
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
				<DefaultCardContainer flex={1} >
					<ContainerContent>
						<Title>{'gerar renda.'}</Title>
						<VerticalSpacing height={relativeScreenHeight(3)} />
						<Description>
							{'vamos até favelas e digitalizamos seus moradores, seus trabalhos e vagas'}
						</Description>
						<VerticalSpacing height={relativeScreenHeight(3)} />
						<Description>
							{'trabalhamos para que essas pessoas tenham mais visibilidade e consigam se colocar no mercado de trabalho com dignidade.'}
						</Description>
					</ContainerContent>
				</DefaultCardContainer>
				<VerticalSpacing />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={'tem mais!'}
						fontSize={20}
						SecondSvgIcon={PlusWhiteIcon}
						svgIconScale={['50%', '30%']}
						onPress={() => navigation.navigate('WhoWeAreCulture')}
					/>
				</ButtonContainer>
			</Body>
		</Container >
	)
}

export { WhoWeAreIncome }
