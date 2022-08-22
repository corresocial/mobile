import React from 'react';

import { Container, Message } from './styles';

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';

interface InstructionCardProps {
    message: string
    highlightedWords?: string[]
    fontSize?: number
    lineHeight?: number
}

function InstructionCard({
    message,
    highlightedWords,
    fontSize,
    lineHeight
}: InstructionCardProps) {
    return (
        <Container>
            <Message
                style={{
                    fontSize: fontSize ? fontSize : 20,
                    lineHeight: lineHeight ? lineHeight : 22
                }}
            >{showMessageWithHighlight(message, highlightedWords)}</Message>
        </Container>
    )
}

export { InstructionCard }