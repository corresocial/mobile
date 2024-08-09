import React, { ReactElement } from 'react'
import { ViewStyle } from 'react-native'

import { Container, ContainerInner } from './styles'
import { relativeScreenDensity } from '@common/screenDimensions'

interface DefaultCardContainerProps {
	withoutPadding?: boolean
	flex?: ViewStyle['flex']
	children: ReactElement<any, any> | ReactElement<any, any>[] | any
}

function DefaultCardContainer({ withoutPadding = false, flex = 0, children }: DefaultCardContainerProps) {
	return (
		<Container style={{ flex }}	>
			<ContainerInner style={{
				paddingHorizontal: !withoutPadding ? relativeScreenDensity(15) : 0,
				paddingVertical: !withoutPadding ? relativeScreenDensity(10) : 0,
				flex,
				justifyContent: flex ? 'space-around' : 'flex-start'
			}}
			>
				{children && children}
			</ContainerInner>
		</Container >
	)
}

export { DefaultCardContainer }
