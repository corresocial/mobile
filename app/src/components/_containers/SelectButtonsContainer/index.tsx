import React from 'react'
import { ScrollView } from 'react-native'
import { screenHeight, screenWidth } from '../../../common/screenDimensions'

import { Container } from './styles'

interface SelectButtonsContainerProps {
    backgroundColor: string
    children: any | any[]// TODO Type
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