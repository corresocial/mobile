import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { Container, Title } from './styles'

interface DefaultHeaderTitleProps {
	title: string
	SvgIcon?: React.FC<SvgProps>
	dimensions?: number
}

function DefaultHeaderTitle({ title, SvgIcon, dimensions = 35 }: DefaultHeaderTitleProps) {
	return (
		<Container>
			{
				!!SvgIcon && (
					<SvgIcon
						height={RFValue(dimensions)}
						width={RFValue(dimensions)}
					/>
				)
			}
			<Title>
				{title}
			</Title>
		</Container>
	)
}

export { DefaultHeaderTitle }
