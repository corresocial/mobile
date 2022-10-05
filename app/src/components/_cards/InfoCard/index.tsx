import React from 'react'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { Container, Description, Title } from './styles'

interface InfoCardProps {
    height: string | number
    color: string
    title: string
    description: string
    highlightedWords: string[]
}

function InfoCard({
    height,
    color,
    title,
    description,
    highlightedWords
}: InfoCardProps) {
    return (
        <Container
            style={{
                height: height,
                backgroundColor: color
            }}>
            <Title>
                {showMessageWithHighlight(title, highlightedWords)}
            </Title>
            <Description>
                {showMessageWithHighlight(description, highlightedWords)}
            </Description>
        </Container>
    )
}

export { InfoCard }