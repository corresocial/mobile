import React from 'react'

import { Container, Description } from './styles'

import { IconComponent } from '@newComponents/IconComponent'

interface EmptyPostsNotifierProps {
	text: string
	onPress?: () => void
}

function EmptyPostsNotifier({ text, onPress }: EmptyPostsNotifierProps) {
	return (
		<Container>
			<IconComponent iconName={'staringEyes'} relativeHeight={60} relativeWidth={60} />
			<Description>{text}</Description>
		</Container>
	)
}

export { EmptyPostsNotifier }
