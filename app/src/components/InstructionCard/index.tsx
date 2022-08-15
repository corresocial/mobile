import React, { useEffect, useRef } from 'react';

import { Container, Message } from './styles';

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { Animated } from 'react-native';

interface InstructionCardProps {
    message: string
    highlightedWords?: string[]
}

function InstructionCard({ message, highlightedWords }: InstructionCardProps) {
    return (
        <Container>
                <Message>{showMessageWithHighlight(message, highlightedWords)}</Message>
        </Container>
    )
}

export { InstructionCard }