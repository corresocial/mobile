import React from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container } from './styles'

interface VerticalSpacingProps {
	height?: number
	relativeDensity?: boolean
	bottomNavigatorSpace?: boolean
}

function VerticalSpacing({ height, relativeDensity, bottomNavigatorSpace }: VerticalSpacingProps) {
	const { bottom } = useSafeAreaInsets()

	return (
		<Container
			relativeDensity={!!relativeDensity}
			bottomNavigatorSpace={!!bottomNavigatorSpace}
			extraBottom={Platform.OS === 'android' ? bottom : 0}
			height={height}
		>

		</Container>
	)
}

export { VerticalSpacing }
