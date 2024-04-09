import React from 'react'
import { useTheme } from 'styled-components'

import { AnswerBinaryQuestionScreenProps } from '@routes/Stack/PollStack/screenProps'

import { ButtonOptionsContainer, Container, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { ProgressBar } from '@components/ProgressBar'

function AnswerBinaryQuestion({ navigation }: AnswerBinaryQuestionScreenProps) {
	const navigateBackwards = () => navigation.goBack()

	const theme = useTheme()

	const question = 'Quem veio primeiro, o ovo ou a galinha?'

	const selectSatisfaction = (value: boolean) => {
		console.log(value)
		// navigation.navigate()
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
			<FormContainer >
				<ButtonOptionsContainer>
					<PrimaryButton
						color={theme.green3}
						label={'sim'}
						labelColor={theme.white3}
						SecondSvgIcon={CheckWhiteIcon}
						onPress={() => selectSatisfaction(true)}
					/>
					<PrimaryButton
						color={theme.red3}
						label={'não'}
						labelColor={theme.white3}
						SvgIcon={XWhiteIcon}
						onPress={() => selectSatisfaction(false)}
					/>
				</ButtonOptionsContainer>
			</FormContainer>
		</Container>
	)
}

export { AnswerBinaryQuestion }
