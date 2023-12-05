import React from 'react'
import { StatusBar } from 'react-native'

import { Body, Container, ContainerContent, Header, BoldPhrase, ButtonContainer, Description } from './styles'
import Logo from '@assets/icons/logoBuilding.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DefaultCardContainer } from '@components/_cards/DefaultCardContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

import { WhoWeAreScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

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
				<DefaultCardContainer flex={1}>
					<ContainerContent>
						<BoldPhrase>{'o corre. é trabalho,'}</BoldPhrase>
						<BoldPhrase>{'o corre. é cultura,'}</BoldPhrase>
						<BoldPhrase>{'o corre. é transformação'}</BoldPhrase>
						<VerticalSpacing height={relativeScreenWidth(6)} />
						<Description>
							{'somos uma organização social que usa todos os lucros para combater desigualdades sociais nas periferias.'}
						</Description>
					</ContainerContent>
				</DefaultCardContainer>
				<VerticalSpacing />
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
