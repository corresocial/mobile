import React from 'react'
import { StatusBar } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { ScrollContainer, Container, CardArea } from './styles'

import { EditSubscriptionRangeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { VerticalSigh } from '../../../components/VerticalSigh'

function EditSubscriptionRange({ navigation }: EditSubscriptionRangeScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(22)}
				centralized
				backgroundColor={theme.white3}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={16}
					title={'alcance corre.'}
					message={'aqui você vê o plano que assinou, outros planos disponíveis'}
					highlightedWords={['corre']}
				/>
			</DefaultHeaderContainer>
			<ScrollContainer showsVerticalScrollIndicator={false}>
				<SubtitleCard text={'seu plano'} highlightedText={['seu']} />
				<CardArea>
					<TitleDescriptionButton
						height={relativeScreenHeight(20)}
						color={theme.white3}
						activeColor={theme.orange1}
						title={'região'}
						description={'a pessoas encontram seus posts  no bairro'}
						highlightedWords={['região', 'bairro']}
						footerValue={'free'}
						checked
						onPress={() => { }}
					/>
				</CardArea>
				<SubtitleCard text={'outros planos'} highlightedText={['outros']} />
				<CardArea>
					<TitleDescriptionButton
						height={relativeScreenHeight(20)}
						color={theme.white3}
						activeColor={theme.orange1}
						title={'cidade'}
						description={'seus posts aparecem na cidade inteira, também pode postar em bairros!'}
						highlightedWords={['cidade', 'também', 'pode', 'postar', 'em', 'bairros']}
						footerValue={'20'}
						// selected={planSelected === 'monthly'}
						onPress={() => { }}
					/>
					<VerticalSigh />
					<TitleDescriptionButton
						height={relativeScreenHeight(20)}
						color={theme.white3}
						activeColor={theme.orange1}
						title={'brasil'}
						description={'postagens aparecem em cidades vizinhas e no brasil inteiro.'}
						highlightedWords={['brasil', 'cidades', 'vizinhas', 'no', 'brasil', 'inteiro']}
						footerValue={'40'}
						// selected={planSelected === 'yearly'}
						onPress={() => { }}
					/>
				</CardArea>
			</ScrollContainer>
		</Container>
	)
}

export { EditSubscriptionRange }
