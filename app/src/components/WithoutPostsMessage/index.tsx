import React from 'react'
import { WithoutPostsContainer, WithoutPostsTitle, WithoutPostsText } from './styles'

interface WithoutPostsMessageProps {
	title: string
	message: string
}

function WithoutPostsMessage({ title, message }: WithoutPostsMessageProps) {
	return (
		<WithoutPostsContainer>
			<WithoutPostsTitle>{title}</WithoutPostsTitle>
			<WithoutPostsText>{message}</WithoutPostsText>
		</WithoutPostsContainer>
	)
}

export { WithoutPostsMessage }
