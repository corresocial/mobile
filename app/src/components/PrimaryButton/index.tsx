import React from 'react'
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { Container, ButtonLabel } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';

interface PrimaryButtonProps {
    color: string
    label: string
    labelColor?: string
    iconSize?: number
    iconColor?: string
    highlightedWords?: string[]
}

function PrimaryButton(props: PrimaryButtonProps) {
    return (
        <Container style={{ backgroundColor: props.color }}>
            <ButtonLabel style={{ color: props.labelColor }}>
                {showMessageWithHighlight(props.label, props.highlightedWords)}
            </ButtonLabel>
            <Icon
                name={'arrow-right'}
                size={props.iconSize || 22}
                color={props.iconColor || props.labelColor}
            />
        </Container>
    );
}

export { PrimaryButton }