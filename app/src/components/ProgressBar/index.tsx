import React from 'react'

import { Container, IndicatorBarBottom, IndicatorBarSurface, IndicatorLabel } from './styles'

interface ProgressBarProps {
	range: number
	value: number
	withoutIndicator?: boolean
}

function ProgressBar({ value, range, withoutIndicator }: ProgressBarProps) {
	return (
		<Container>
			{!withoutIndicator && <IndicatorLabel>{`${value} de ${range}`}</IndicatorLabel>}
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
