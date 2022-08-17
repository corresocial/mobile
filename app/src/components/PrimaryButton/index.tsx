import React, { useEffect, useRef, useState } from 'react'
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { Keyboard } from 'react-native';

interface PrimaryButtonProps {
    color: string
    label: string
    labelColor?: string
    iconName: string
    iconSize?: number
    iconColor?: string
    keyboardHideButton?: boolean // TODO Type
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
    keyboardHideButton = true,
    justifyContent,
    onPress
}: PrimaryButtonProps) {
    const [buttonPressed, setButtomPressed] = useState<Boolean>(false)
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(true)

    const buttonRef = useRef<any>(null) // TODO Type

    useEffect(() => {
        if (!keyboardHideButton) return
        Keyboard.addListener('keyboardDidShow', () => hideButton())
        Keyboard.addListener('keyboardDidHide', () => showButton())
    },[])

    const hideButton = async () => {
        if (!buttonRef.current) return
        buttonRef.current.fadeOutDown(400).then((endState: any) => endState.finished && setButtonVisibility(false))
    }

    const showButton = () => {
        if (!buttonRef.current) return
        setButtonVisibility(true)
        buttonRef.current.fadeInUp(400)
    }

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
            <ContainerBottom
                ref={buttonRef}
                style={{ display: buttonVisibility ? 'flex' : 'none' }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        justifyContent: justifyContent as any || 'center', // TODO Type
                        marginRight: buttonPressed ? -3 : 0,
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