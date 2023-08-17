import React, { ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, ContainerInner } from './styles'

interface DefaultCardContainerProps {
	withoutPadding?: boolean
	flex?: ViewStyle['flex']
	children: ReactElement<any, any> | ReactElement<any, any>[] | any
}

function DefaultCardContainer({ withoutPadding = false, flex = 0, children }: DefaultCardContainerProps) {
	return (
		<Container style={{ flex }}	>
			<ContainerInner style={{
				paddingHorizontal: !withoutPadding ? RFValue(15) : 0,
				paddingVertical: !withoutPadding ? RFValue(10) : 0,
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
