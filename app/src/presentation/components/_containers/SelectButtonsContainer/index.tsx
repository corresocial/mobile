import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from './styles'

interface SelectButtonsContainerProps {
	backgroundColor: string
	noPadding?: boolean
	children: React.ReactChild | React.ReactChild[] | (React.ReactElement | null)[]
}

function SelectButtonsContainer({ backgroundColor, noPadding, children }: SelectButtonsContainerProps) {
	return (
		<Container
			style={{
				backgroundColor,
				padding: noPadding ? 0 : RFValue(20)
			}}
		>
			{children}
		</Container >
	)
}

export { SelectButtonsContainer }
