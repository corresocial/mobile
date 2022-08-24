import React, {  useRef, useState } from 'react'

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom } from './styles';
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { SvgProps } from 'react-native-svg';

interface OptionButtonProps {
    color: string
    label: string
    labelColor?: string
    SvgIcon?: React.FC<SvgProps> 
    highlightedWords?: string[]
    justifyContent?: { [key: string]: React.CSSProperties }
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

    const buttonRef = useRef<any>()

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
                    } as { [key: string]: React.CSSProperties }}
                >
                    {SvgIcon && <SvgIcon height={'40%'} width={'25%'} />}
                    <ButtonLabel style={{ color: labelColor }}>
                        {showMessageWithHighlight(label, highlightedWords)}
                    </ButtonLabel>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer>
    );
}

export { OptionButton }