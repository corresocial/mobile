import React, { useEffect, useRef, useState } from 'react'
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { SvgProps } from 'react-native-svg';
import { screenHeight, screenWidth } from '../../common/screenDimensions';

interface OptionButtonProps {
    color: string
    label: string
    labelColor?: string
    SvgIcon?: any // TODO Type
    highlightedWords?: string[]
    justifyContent?: string
    onPress: () => void
}

function OptionButton({
    color,
    labelColor,
    label,
    highlightedWords,
    SvgIcon,
    justifyContent,
    onPress
}: OptionButtonProps) {
    const [buttonPressed, setButtomPressed] = useState<Boolean>(false)
    const [buttonVisibility, setButtonVisibility] = useState<boolean>(true)

    const buttonRef = useRef<any>(null) // TODO Type

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
                    <SvgIcon height={'40%'} width={'25%'}/>
                    <ButtonLabel style={{ color: labelColor }}>
                        {showMessageWithHighlight(label, highlightedWords)}
                    </ButtonLabel>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer>
    );
}

export { OptionButton }