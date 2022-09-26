import React, { useEffect, useRef, useState } from 'react'
import { View, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { SvgProps } from 'react-native-svg';

interface PrimaryButtonProps {
    color: string
    label: string
    labelColor?: string
    iconName: string
    iconColor?: string
    iconSize?: number
    SvgIcon?: React.FC<SvgProps>
    fontSize?: number
    keyboardHideButton?: boolean
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
    fontSize,
    iconSize,
    iconColor,
    SvgIcon,
    keyboardHideButton = true,
    justifyContent,
    onPress
}: PrimaryButtonProps) {
    const [buttonPressed, setButtomPressed] = useState<Boolean>(false)
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(true)

    const buttonRef = useRef<any>()

    useEffect(() => {
        if (!keyboardHideButton) return
        Keyboard.addListener('keyboardDidShow', () => hideButton())
        Keyboard.addListener('keyboardDidHide', () => showButton())
    }, [])

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
                        justifyContent: justifyContent || 'center',
                        marginRight: buttonPressed ? -3 : 0,
                    } as { [key: string]: React.CSSProperties }}>
                    <ButtonLabel style={{
                        color: labelColor,
                        fontSize: fontSize ? fontSize : 18
                    }}>
                        {showMessageWithHighlight(label, highlightedWords)}
                    </ButtonLabel>
                    {!!SvgIcon
                        ? <SvgIcon height={'30%'} width={'11%'} />
                        : <Icon
                            name={iconName || 'question'}
                            size={iconSize || 22}
                            color={iconColor || labelColor}
                        />
                    }
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer>
    );
}

export { PrimaryButton }