import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { PollQuestion, SatisfactionType } from '@domain/poll/entity/types'

import { usePollRegisterContext } from '@contexts/PollRegisterContext'

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

function AnswerSatisfactionQuestion({ route, navigation }: AnswerSatisfactionQuestionScreenProps) {
	const { getNextQuestion, getResponseProgress, saveResponseData } = usePollRegisterContext()

	const theme = useTheme()

	const { questionData } = route.params
	const responseProgress = getResponseProgress(questionData.questionId)

	const navigateBackwards = () => navigation.goBack()

	const selectSatisfactionOption = (value: SatisfactionType) => {
		saveResponseData(questionData, value)
		const nextQuestion = getNextQuestion(questionData)
		navigateToNextReponseScreen(nextQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: PollQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishedPollResponse')

		switch (nextQuestion?.questionType) {
			case 'binary': return navigation.push('AnswerBinaryQuestion', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('AnswerSatisfactionQuestion', { questionData: nextQuestion })
			case 'textual': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'numerical': return navigation.push('AnswerTextualQuestion', { questionData: nextQuestion })
			case 'select': return navigation.push('AnswerSelectQuestion', { questionData: nextQuestion })
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(50)}
				centralized
				backgroundColor={theme.colors.purple[2]}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={16}
						message={questionData.question || ''}
						highlightedWords={questionData.question ? questionData.question.split(' ') : []}
					>
						<ProgressBar value={responseProgress[0]} range={responseProgress[1]} />
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer>
				<ButtonOptionsContainer>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.colors.red[3]}
						SvgIcon={SatisfactionEmoji1WhiteIcon}
						onPress={() => selectSatisfactionOption(1)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.colors.red[2]}
						SvgIcon={SatisfactionEmoji2WhiteIcon}
						onPress={() => selectSatisfactionOption(2)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.colors.yellow[3]}
						SvgIcon={SatisfactionEmoji3WhiteIcon}
						onPress={() => selectSatisfactionOption(3)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.colors.green[2]}
						SvgIcon={SatisfactionEmoji4WhiteIcon}
						onPress={() => selectSatisfactionOption(4)}
					/>
					<SmallButton
						height={relativeScreenWidth(14)}
						relativeWidth={relativeScreenWidth(14)}
						color={theme.colors.green[3]}
						SvgIcon={SatisfactionEmoji5WhiteIcon}
						onPress={() => selectSatisfactionOption(5)}
					/>
				</ButtonOptionsContainer>
			</FormContainer>
		</Container>
	)
}

export { AnswerSatisfactionQuestion }
