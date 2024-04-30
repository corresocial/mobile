import React from 'react'

import { Container, IndicatorBarBottom, IndicatorBarSurface } from './styles'

interface ProgressBarProps {
	range: number
	value: number
}

function ProgressBar({ value, range }: ProgressBarProps) {
	return (
		<Container>
			<IndicatorBarBottom>
				<IndicatorBarSurface style={{
					width: `${(100 / range) * value}%`
				}}
				/>
			</IndicatorBarBottom>
		</Container>
	)
}

export { ProgressBar }
