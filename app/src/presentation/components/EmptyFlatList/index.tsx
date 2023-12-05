import React from 'react'

import { Container, Message } from './styles'

interface EmptyFlatListProps {
	message: string
}

function EmptyFlatList({ message }: EmptyFlatListProps) {
	return (
		<Container>
			<Message>
				{message}
			</Message>
		</Container>
	)
}

export { EmptyFlatList }
