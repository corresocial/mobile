import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'

import { ProgressBar } from '../../ProgressBar'

interface PostSelectButtonProps {
	title: string
	highlightedWords: string[]
	headerBackgroundColor?: string
	backgroundColor: string
	progress?: number[]
	children?: React.ReactNode[]
	navigateBackwards: () => void
}

function PostSelectButton({ title, highlightedWords, headerBackgroundColor, backgroundColor, progress, children, navigateBackwards }: PostSelectButtonProps) {
	return (
		<Container>
			<StatusBar backgroundColor={headerBackgroundColor || theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(30)}
				relativeHeight={relativeScreenHeight(30)}
				centralized
				backgroundColor={headerBackgroundColor || theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={15}
					message={title}
					highlightedWords={highlightedWords}
				>
					{progress && <ProgressBar value={progress[0]} range={progress[1]} />}
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={backgroundColor}>
				<ButtonsContainer numberOfChildrens={children ? children.length : 0}>
					{children}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostSelectButton }
