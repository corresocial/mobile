import React, { useState } from 'react'
import { FontAwesome5 as Icon} from '@expo/vector-icons';

import {  ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
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
    onPress: () => void
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
    const [buttonPressed, setButtomPressed] = useState<Boolean>(false)

    function pressingButton() {
        setButtomPressed(true)
    }

    function notPressingButton() {
        setButtomPressed(false)
    }

    function releaseButton() {
        setButtomPressed(false)
        onPress()
    }

    return (
        <TouchableContainer

            onPressIn={pressingButton}
            onPressOut={notPressingButton}
            onPress={releaseButton}
        >
            <ContainerBottom>
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        justifyContent: justifyContent as any || 'center', // TODO Type
                        marginRight: buttonPressed ? -3 : 0
                    }}>
                    <ButtonLabel style={{ color: labelColor }}>
                        {showMessageWithHighlight(label, highlightedWords)}
                    </ButtonLabel>
                    <Icon
                        name={iconName || 'question'}
                        size={iconSize || 22}
                        color={iconColor || labelColor}
                    />
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer>
    );
}

export { PrimaryButton }

/* LEGADO

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

*/