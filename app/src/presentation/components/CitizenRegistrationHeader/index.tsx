import React from 'react'
import { useTheme } from 'styled-components'

import { InstructionButtonContainer } from './styles'

import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { ProgressBar } from '@components/ProgressBar'
import { QuestionaryHeader } from '@components/QuestionaryHeader'

interface CitizenRegistrationHeaderProps {
	message: string
	customHeaderHeight?: string
	highlightedWords?: string[]
	progress?: number[]
	navigateBackwards: () => void
}

export function CitizenRegistrationHeader({ message, customHeaderHeight, highlightedWords, progress, navigateBackwards }: CitizenRegistrationHeaderProps) {
	const theme = useTheme()

	return (
		<>
			<QuestionaryHeader
				onChatOpened={() => console.log('Open chat')}
				onNotePadOpened={() => console.log('Open notes')}
				onBackPressed={navigateBackwards}
			/>
			<DefaultHeaderContainer
				relativeHeight={customHeaderHeight || '35%'}
				centralized
				backgroundColor={theme.orange2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<InstructionCard
						fontSize={16}
						message={message || 'mensagem'}
						highlightedWords={highlightedWords || message ? message.split(' ') : []}
					>
						{progress && <ProgressBar value={progress[0]} range={progress[1]} />}
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
		</>
	)
}
