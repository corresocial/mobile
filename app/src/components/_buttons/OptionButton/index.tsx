import React, { useRef, useState } from 'react'
import { SvgProps } from 'react-native-svg';

import { ButtonLabel, TouchableContainer, ContainerSurface, ContainerBottom, IconArea, LabelDescriptionArea, ButtonDescription } from './styles';
import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions';

interface OptionButtonProps {
    color: string
    label: string
    labelColor?: string
    SvgIcon?: React.FC<SvgProps>
    leftSideColor?: string
    highlightedWords?: string[]
    description?: string
    onPress: () => void
}

function OptionButton({
    color,
    labelColor,
    label,
    highlightedWords,
    SvgIcon,
    leftSideColor = theme.orange2,
    description,
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

    const heightWithoutDescription = screenHeight * 0.1

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
                    height: description ? screenHeight * 0.16 : heightWithoutDescription
                }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        marginRight: buttonPressed ? -4 : 0,
                        height: description ? screenHeight * 0.16 : heightWithoutDescription
                    } as { [key: string]: React.CSSProperties }}
                >
                    <IconArea
                        style={{
                            backgroundColor: leftSideColor
                        }}
                    >
                        {SvgIcon && <SvgIcon height={'60%'} width={'60%'} />}
                    </IconArea>
                    <LabelDescriptionArea>
                        <ButtonLabel style={{
                            color: labelColor,
                            textAlign: !description ? 'center' : 'left'
                        }}>
                            {showMessageWithHighlight(label, highlightedWords)}
                        </ButtonLabel>
                        {
                            description
                                ? <ButtonDescription>
                                    {description}
                                </ButtonDescription>
                                : <></>
                        }
                    </LabelDescriptionArea>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer >
    );
}

export { OptionButton }