import React from 'react'
import { FontAwesome5 as Icon, Ionicons as IonicIcon } from '@expo/vector-icons';

import { Container, ButtonLabel } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';

interface PrimaryButtonProps {
    color: string
    label: string
    labelColor?: string
    iconName: string
    iconSize?: number
    iconColor?: string
    highlightedWords?: string[]
    justifyContent?: string
    onPress?: () => void
}

function PrimaryButton({
    color,
    labelColor,
    label,
    highlightedWords,
    iconName,
    iconSize,
    iconColor,
    justifyContent,
    onPress
}: PrimaryButtonProps) {
    return (
        <Container
            style={{
                backgroundColor: color,
                justifyContent: justifyContent as any || 'center' // TODO Type
            }}
            onPress={onPress}
        >
            <ButtonLabel style={{ color: labelColor }}>
                {showMessageWithHighlight(label, highlightedWords)}
            </ButtonLabel>
            <Icon
                name={iconName || 'question'}
                size={iconSize || 22}
                color={iconColor || labelColor}
            />
        </Container>
    );
}

export { PrimaryButton }