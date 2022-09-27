import React from 'react';

import { Container, Message } from './styles';

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';

interface InstructionCardProps {
    message: string
    highlightedWords?: string[]
    fontSize?: number
    fontSizeHighlighted?: number
    lineHeight?: number
    borderLeftWidth?: number
    flex?: number
    children?: React.ReactElement
}

function InstructionCard({
    message,
    highlightedWords,
    fontSize,
    fontSizeHighlighted,
    lineHeight,
    borderLeftWidth,
    flex = 1,
    children
}: InstructionCardProps) {
    return (
        <Container
            style={{
                borderLeftWidth: borderLeftWidth ? borderLeftWidth : 5,
                flex: flex
            }}
        >
            <Message
                style={{
                    fontSize: fontSize ? fontSize : 20,
                    lineHeight: lineHeight ? lineHeight : 22,
                }}
            >{
                    showMessageWithHighlight(message, highlightedWords, fontSizeHighlighted)}
            </Message>
            {children}
        </Container>
    )
}

export { InstructionCard }