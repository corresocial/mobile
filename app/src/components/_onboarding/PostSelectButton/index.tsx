import React from 'react'
import { StatusBar } from 'react-native'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { ButtonsContainer, Container } from './styles'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

interface PostSelectButtonProps {
	title: string
	highlightedWords: string[]
	headerBackgroundColor?: string
	backgroundColor: string
	children?: React.ReactNode[]
	navigateBackwards: () => void
}

function PostSelectButton({ title, highlightedWords, headerBackgroundColor, backgroundColor, children, navigateBackwards }: PostSelectButtonProps) {
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
					reducedPaddingVertical
					borderLeftWidth={8}
					fontSize={16}
					message={title}
					highlightedWords={highlightedWords}
				/>
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
