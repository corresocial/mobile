import React from 'react'
import { StatusBar } from 'react-native'

import { WhoWeAreTransformationScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { Body, Container, Header, Title, ButtonContainer, ContainerContent, Description } from './styles'
import HandOnCorreWhiteIcon from '@assets/icons/handOnCorre.svg'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '@components/_cards/DefaultCardContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function WhoWeAreTransformation({ navigation }: WhoWeAreTransformationScreenProps) {
	const navigateToHelpUs = () => {
		navigation.navigate('Configurations')
		navigation.navigate('HelpUs')
	}

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
						<Title>{'transformação'}</Title>
						<VerticalSpacing height={3} />
						<Description>
							{'colhemos dados em entrevistas, encontros com moradores e enquetes para criar planos de ação e priorizar melhorias nas comunidades de baixa renda.'}
						</Description>
						<VerticalSpacing height={3} />
						<Description>
							{'tudo gerido por líderes locais, que entendem a realidade de onde vem!'}
						</Description>
					</ContainerContent>
				</DefaultCardContainer>
				<VerticalSpacing />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={'acensão social!'}
						highlightedWords={['acensão']}
						SecondSvgIcon={HandOnCorreWhiteIcon}
						svgIconScale={['50%', '30%']}
						fontSize={18}
						onPress={navigateToHelpUs}
					/>
				</ButtonContainer>
			</Body>
		</Container >
	)
}

export { WhoWeAreTransformation }
