import React from 'react'
import { useTheme } from 'styled-components'

import { SatisfactionType } from '@domain/poll/entity/types'

import { AnswerSatisfactionQuestionScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonOptionsContainer, Container, InstructionButtonContainer } from './styles'
import SatisfactionEmoji1WhiteIcon from '@assets/icons/satisfactionEmoji-1-white.svg'
import SatisfactionEmoji2WhiteIcon from '@assets/icons/satisfactionEmoji-2-white.svg'
import SatisfactionEmoji3WhiteIcon from '@assets/icons/satisfactionEmoji-3-white.svg'
import SatisfactionEmoji4WhiteIcon from '@assets/icons/satisfactionEmoji-4-white.svg'
import SatisfactionEmoji5WhiteIcon from '@assets/icons/satisfactionEmoji-5-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { ProgressBar } from '@components/ProgressBar'

function AnswerSatisfactionQuestion({ navigation }: AnswerSatisfactionQuestionScreenProps) {
	const navigateBackwards = () => navigation.goBack()

	const theme = useTheme()

	const question = 'Quem veio primeiro, o ovo ou a galinha?'

	const selectSatisfaction = (value: SatisfactionType) => {
		console.log(value)
		navigation.navigate('AnswerBinaryQuestion')
	}

	return (
		<Container>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(50)}
				centralized
				backgroundColor={theme.purple2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={16}
						message={question}
						highlightedWords={question ? question.split(' ') : []}
					>
						<ProgressBar value={1} range={5} />
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer>
				<ButtonOptionsContainer>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.red3}
						SvgIcon={SatisfactionEmoji1WhiteIcon}
						onPress={() => selectSatisfaction(1)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.red2}
						SvgIcon={SatisfactionEmoji2WhiteIcon}
						onPress={() => selectSatisfaction(2)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.yellow3}
						SvgIcon={SatisfactionEmoji3WhiteIcon}
						onPress={() => selectSatisfaction(3)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.green2}
						SvgIcon={SatisfactionEmoji4WhiteIcon}
						onPress={() => selectSatisfaction(4)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.green3}
						SvgIcon={SatisfactionEmoji5WhiteIcon}
						onPress={() => selectSatisfaction(5)}
					/>
				</ButtonOptionsContainer>
			</FormContainer>
		</Container>
	)
}

export { AnswerSatisfactionQuestion }
