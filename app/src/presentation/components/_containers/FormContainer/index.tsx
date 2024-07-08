import React, { ReactElement } from 'react'
import { ViewStyle } from 'react-native'

import { Container } from './styles'

interface FormContainerProps {
	children: ReactElement | ReactElement[] | React.ReactElement[]
	backgroundColor?: string
	justifyContent?: ViewStyle['justifyContent']
	withoutPaddingTop?: boolean
}

function FormContainer({
	children,
	backgroundColor,
	justifyContent,
	withoutPaddingTop,
}: FormContainerProps) {
	return (
		<Container
			backgroundColor={backgroundColor}
			justifyContent={justifyContent}
			withoutPaddingTop={withoutPaddingTop}
		>
			{children}
		</Container>
	)
}

export { FormContainer }
