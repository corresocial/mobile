import React from 'react'

import { Container, IndicatorBarBottom, IndicatorBarSurface, IndicatorLabel } from './styles'

interface ProgressBarProps {
    range: number
    value: number
}

function ProgressBar({ value, range }: ProgressBarProps) {
    return (
        <Container>
            <IndicatorLabel>{`${value} de ${range}`}</IndicatorLabel>
            <IndicatorBarBottom>
                <IndicatorBarSurface
                    style={{
                        width: `${100 / range * value}%`
                    }}
                />
            </IndicatorBarBottom>
        </Container>
    )
}

export { ProgressBar }