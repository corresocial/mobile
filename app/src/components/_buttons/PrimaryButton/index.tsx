import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, TextStyle } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { screenHeight } from '../../../common/screenDimensions';

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions';

interface PrimaryButtonProps {
    relativeWidth?: string
    relativeHeight?: string
    minHeight?: number
    color: string
    label?: string
    labelColor?: string
    iconName?: string
    iconColor?: string
    iconSize?: number
    SvgIcon?: React.FC<SvgProps>
    SecondSvgIcon?: React.FC<SvgProps>
    svgIconScale?: [height: string, width: string]
    fontSize?: number
    textAlign?: TextStyle['textAlign']
    keyboardHideButton?: boolean
    startsHidden?: boolean
    highlightedWords?: string[]
    justifyContent?: string
    flexDirection?: string
    onPress: () => void
}

function PrimaryButton({
    relativeWidth,
    relativeHeight,
    minHeight = 65,
    color,
    labelColor,
    label,
    highlightedWords,
    iconName,
    fontSize,
    textAlign = 'center',
    iconSize,
    iconColor,
    SvgIcon,
    SecondSvgIcon,
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
                style={{
                    display: buttonVisibility ? 'flex' : 'none',
                    opacity: buttonVisibility ? 1 : 0, // TODO Bug point
                    width: relativeWidth || '100%',
                    height: relativeHeight || screenHeight * 0.073,
                    minHeight: minHeight,
                    justifyContent: justifyContent
                } as { [key: string]: React.CSSProperties }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        flexDirection: flexDirection || 'row',
                        justifyContent: justifyContent || 'center',
                        minHeight: minHeight,
                        marginRight: buttonPressed ? -3 : 0,
                    } as { [key: string]: React.CSSProperties }}>
                    {
                        !!SecondSvgIcon && <SecondSvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />
                    }
                    {!!label
                        && <ButtonLabel style={{
                            color: labelColor,
                            fontSize: fontSize ? fontSize : 18,
                            textAlign: textAlign 
                        }}>
                            {showMessageWithHighlight(label, highlightedWords)}
                        </ButtonLabel>
                    }
                    {!!SvgIcon &&
                        <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />
                    }
                    {!!iconName &&
                        <Icon
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