import React from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, Header, Title, ButtonContainer, ContainerContent, Description } from './styles'
import { theme } from '../../../common/theme'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'

import { WhoWeAreCultureScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '../../../components/_cards/DefaultCardContainer'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { relativeScreenHeight } from '../../../common/screenDimensions'

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
					<ContainerContent>
						<Title>{'gerar cultura.'}</Title>
						<VerticalSpacing height={relativeScreenHeight(3)} />
						<Description>
							{'também digitalizamos seus artistas e cultura locais, não importa de onde. '}
						</Description>
						<VerticalSpacing height={relativeScreenHeight(3)} />
						<Description>
							{'queremos oferecer uma plataforma gratuita de educação e arte para todos os brasileiros'}
						</Description>
						<VerticalSpacing height={relativeScreenHeight(3)} />
						<Description>
							{'além de gerar renda, auxiliamos na formação social e cultural de todos.'}
						</Description>
					</ContainerContent>
				</DefaultCardContainer>
				<VerticalSpacing />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={'só mais uma coisa'}
						fontSize={20}
						SecondSvgIcon={DescriptionWhiteIcon}
						svgIconScale={['50%', '30%']}
						onPress={() => navigation.navigate('WhoWeAreTransformation')}
					/>
				</ButtonContainer>
			</Body>
		</Container >
	)
}

export { WhoWeAreCulture }
