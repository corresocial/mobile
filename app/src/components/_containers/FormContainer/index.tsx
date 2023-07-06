import React, { ReactElement } from 'react'
import { ViewStyle } from 'react-native'

import { Container } from './styles'

interface FormContainerProps {
	children: ReactElement | ReactElement[] | React.ReactElement<any>[] | any // TODO Type
	backgroundColor?: string,
	justifyContent?: ViewStyle['justifyContent']
}

function FormContainer({
	children,
	backgroundColor,
	justifyContent = 'space-around'
}: FormContainerProps) {
	return (
		<Container style={{
			backgroundColor,
			justifyContent
		}}
		>
			{children}
		</Container>
	)
}

export { FormContainer }
