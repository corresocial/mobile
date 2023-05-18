import React, { ReactElement } from 'react'

import { Container } from './styles'

interface FormContainerProps {
	children: ReactElement | ReactElement[] | React.ReactElement<any>[] | any // TODO Type
	backgroundColor?: string,
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | undefined
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
