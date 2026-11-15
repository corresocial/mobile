import React from 'react'

import { Container } from './styles'
import { relativeScreenDensity } from '@common/screenDimensions'

interface SelectButtonsContainerProps {
	backgroundColor: string
	noPadding?: boolean
	children: React.ReactElement | string | number | (React.ReactElement | string | number)[] | (React.ReactElement | null)[]
}

function SelectButtonsContainer({ backgroundColor, noPadding, children }: SelectButtonsContainerProps) {
	return (
		<Container
			style={{
				backgroundColor,
				padding: noPadding ? 0 : relativeScreenDensity(20)
			}}
		>
			{children}
		</Container >
	)
}

export { SelectButtonsContainer }
