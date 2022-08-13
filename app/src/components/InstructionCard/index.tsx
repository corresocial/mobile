import React, { useEffect, useRef } from 'react';

import { Container, Message } from './styles';

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { Animated } from 'react-native';

interface InstructionCardProps {
    message: string
    highlightedWords?: string[]
}

function InstructionCard({ message, highlightedWords }: InstructionCardProps) {
    const opacity = useRef(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(opacity.current, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start()
    })

    return (
        <Container>
                <Message>{showMessageWithHighlight(message, highlightedWords)}</Message>
        </Container>
    )
}

export { InstructionCard }