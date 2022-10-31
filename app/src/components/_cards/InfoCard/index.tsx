import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { Container, Description, Title } from './styles'

interface InfoCardProps {
    height: string | number
    color: string
    title: string
    titleFontSize?: number
    description: string
    highlightedWords: string[]
}

function InfoCard({
    height,
    color,
    title,
    titleFontSize = 22,
    description,
    highlightedWords
}: InfoCardProps) {
    return (
        <Container
            style={{
                height: height,
                backgroundColor: color
            }}>
            <Title
                style={{
                    fontSize: RFValue(titleFontSize)
                }}
            >
                {showMessageWithHighlight(title, highlightedWords)}
            </Title>
            <Description>
                {showMessageWithHighlight(description, highlightedWords)}
            </Description>
        </Container>
    )
}

export { InfoCard }