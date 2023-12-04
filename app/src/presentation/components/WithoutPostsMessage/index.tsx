import React from 'react'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { WithoutPostsContainer, WithoutPostsTitle, WithoutPostsText } from './styles'

interface WithoutPostsMessageProps {
	title?: string
	message: string
	highlightedWords?: string[]
	backgroundColor?: string
}

function WithoutPostsMessage({ title, message, highlightedWords = [], backgroundColor = 'white' }: WithoutPostsMessageProps) {
	return (
		<WithoutPostsContainer style={{ backgroundColor }}>
			{title && <WithoutPostsTitle>{title}</WithoutPostsTitle>}
			<WithoutPostsText>{showMessageWithHighlight(message, highlightedWords)}</WithoutPostsText>
		</WithoutPostsContainer>
	)
}

export { WithoutPostsMessage }
