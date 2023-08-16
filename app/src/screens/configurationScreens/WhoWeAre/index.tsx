import React from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, ContainerContent, Header, Sigh, BoldPhrase, ButtonContainer, Description } from './styles'
import { theme } from '../../../common/theme'
import Logo from '../../../assets/icons/logoBuilding.svg'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'

import { WhoWeAreScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultPostViewHeader } from '../../../components/DefaultPostViewHeader'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '../../../components/_cards/DefaultCardContainer'
import { VerticalSigh } from '../../../components/VerticalSigh'

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
				<Logo width={'65%'} height={'40%'} />
				<DefaultCardContainer >
					<ContainerContent>
						<BoldPhrase>{'o corre. é trabalho,'}</BoldPhrase>
						<BoldPhrase>{'o corre. é cultura,'}</BoldPhrase>
						<BoldPhrase>{'o corre. é transformação'}</BoldPhrase>
						<Sigh />
						<Description>
							{'somos uma organização social que usa todos os lucros para combater desigualdades sociais nas periferias.'}
						</Description>
					</ContainerContent>
				</DefaultCardContainer>
				<VerticalSigh />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={'como fazemos isso?'}
						highlightedWords={['como']}
						fontSize={20}
						SecondSvgIcon={QuestionMarkWhiteIcon}
						svgIconScale={['50%', '20%']}
						onPress={() => navigation.navigate('WhoWeAreIncome')}
					/>
				</ButtonContainer>
			</Body>
		</Container >
	)
}

export { WhoWeAre }
