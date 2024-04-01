import React, { ReactElement } from 'react'
import { ViewStyle } from 'react-native'

import { Container } from './styles'

interface FormContainerProps {
	children: ReactElement | ReactElement[] | React.ReactElement[]
	backgroundColor?: string,
	justifyContent?: ViewStyle['justifyContent']
}

function FormContainer({
	children,
	backgroundColor,
	justifyContent
}: FormContainerProps) {
	return (
		<Container
			backgroundColor={backgroundColor}
			justifyContent={justifyContent}
		>
			{children}
		</Container>
	)
}

export { FormContainer }
