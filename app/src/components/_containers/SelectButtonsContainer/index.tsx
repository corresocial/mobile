import React from 'react'

import { Container } from './styles'

interface SelectButtonsContainerProps {
	backgroundColor: string
	children: React.ReactChild | React.ReactChild[]
}

function SelectButtonsContainer({ backgroundColor, children }: SelectButtonsContainerProps) {
	return (
		<Container
			style={{
				backgroundColor,
			}}
		>
			{children}
		</Container >
	)
}

export { SelectButtonsContainer }
