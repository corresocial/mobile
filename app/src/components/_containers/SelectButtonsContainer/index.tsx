import React from 'react'

import { Container } from './styles'

interface SelectButtonsContainerProps {
    backgroundColor: string
    children: JSX.Element | JSX.Element[]
}

function SelectButtonsContainer({ backgroundColor, children }: SelectButtonsContainerProps) {
    return (
        <Container
            style={{
                backgroundColor: backgroundColor,
            }}
        >
            {children}
        </Container >
    )
}

export { SelectButtonsContainer }