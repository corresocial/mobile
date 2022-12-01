import React, { ReactElement } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, ContainerInner } from './styles'

interface DefaultCardContainerProps {
	withoutPadding?: boolean
	children: ReactElement<any, any> | ReactElement<any, any>[] | any
}

function DefaultCardContainer({ withoutPadding = false, children }: DefaultCardContainerProps) {
	return (
		<Container>
			<ContainerInner style={{
				paddingHorizontal: !withoutPadding ? RFValue(15) : 0,
				paddingVertical: !withoutPadding ? RFValue(10) : 0
			}}
			>
				{children && children}
			</ContainerInner>
		</Container>
	)
}

export { DefaultCardContainer }
