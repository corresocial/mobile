import React, { useEffect, useRef, useState } from 'react'
import {  Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { SvgProps } from 'react-native-svg';
import { screenHeight } from '../../common/screenDimensions';

interface PrimaryButtonProps {
    relativeWidth?: string
    relativeHeight?: string
    color: string
    label?: string
    labelColor?: string
    iconName?: string
    iconColor?: string
    iconSize?: number
    SvgIcon?: React.FC<SvgProps>
    svgIconScale?: [height: string, width: string]
    fontSize?: number
    keyboardHideButton?: boolean
    startsHidden?: boolean
    highlightedWords?: string[]
    justifyContent?:string
    flexDirection?:string
    onPress: () => void
}

function  PrimaryButton({
    relativeWidth,
    relativeHeight,
    color,
    labelColor,
    label,
    highlightedWords,
    iconName,
    fontSize,
    iconSize,
    iconColor,
    SvgIcon,
    svgIconScale,
    keyboardHideButton = true,
    startsHidden = false,
    justifyContent,
    flexDirection,
    onPress
}: PrimaryButtonProps) {
    const [buttonPressed, setButtomPressed] = useState<Boolean>(false)
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(true)

    const buttonRef = useRef<any>()

    useEffect(() => {
        if (startsHidden && keyboardHideButton) {
            setButtonVisibility(false)
        }
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
                style={{
                    display: buttonVisibility ? 'flex' : 'none',
                    opacity: buttonVisibility ? 1 : 0, // TODO Bug point
                    width: relativeWidth || '100%',
                    height: relativeHeight || screenHeight * 0.073,
                    justifyContent: justifyContent
                } as { [key: string]: React.CSSProperties }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        flexDirection: flexDirection || 'row',
                        justifyContent: justifyContent || 'center',
                        marginRight: buttonPressed ? -3 : 0,
                    } as { [key: string]: React.CSSProperties }}>
                    {!!label
                        && <ButtonLabel style={{
                            color: labelColor,
                            fontSize: fontSize ? fontSize : 18
                        }}>
                            {showMessageWithHighlight(label, highlightedWords)}
                        </ButtonLabel>
                    }
                    {!!SvgIcon
                        ? <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />
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