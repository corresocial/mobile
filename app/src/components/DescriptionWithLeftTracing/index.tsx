import React from 'react'

import { Container, Description } from './styles'

interface DescriptionWithLeftTracingProps {
	text: string
}

function DescriptionWithLeftTracing({ text }: DescriptionWithLeftTracingProps) {
	return (
		<Container>
			<Description>
				{text}
			</Description>
		</Container>
	)
}

export { DescriptionWithLeftTracing }
