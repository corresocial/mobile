import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, TextStyle } from 'react-native';
import { FontAwesome5 as Icon } from '@expo/vector-icons';
import { SvgProps } from 'react-native-svg';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { screenHeight } from '../../../common/screenDimensions';

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions';
import { RFValue } from 'react-native-responsive-fontsize';
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';

interface PrimaryButtonProps {
    relativeWidth?: string
    relativeHeight?: string
    minHeight?: number
    color: string
    label?: string
    labelColor?: string
    labelMarginLeft?: number | string
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
    labelMarginLeft,
    highlightedWords,
    iconName,
    fontSize = 18,
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
        const unsubscribeShow = Keyboard.addListener('keyboardDidShow', () => hideButton())
        const unsubscribeHide = Keyboard.addListener('keyboardDidHide', () => showButton())

        return () => {
            unsubscribeShow.remove()
            unsubscribeHide.remove()
        }
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
                    height: relativeHeight || RFValue(65),
                    minHeight: RFValue(minHeight),
                    justifyContent: justifyContent
                } as { [key: string]: React.CSSProperties }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        flexDirection: flexDirection || 'row',
                        justifyContent: justifyContent || 'center',
                        minHeight: RFValue(minHeight),
                        marginRight: buttonPressed ? RFValue(-7) : 0,
                    } as { [key: string]: React.CSSProperties }}>
                    {
                        !!SecondSvgIcon && <SecondSvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />
                    }
                    {!!label
                        && <ButtonLabel style={{
                            color: labelColor,
                            fontSize: RFValue(fontSize),
                            textAlign: textAlign,
                            marginLeft: labelMarginLeft || 0
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