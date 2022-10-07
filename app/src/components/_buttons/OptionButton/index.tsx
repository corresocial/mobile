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
    labelSize?: number
    labelAlign?: any // TODO Type
    SvgIcon?: React.FC<SvgProps>
    svgIconScale?: [height: string, width: string]
    leftSideColor?: string
    leftSideWidth?: string | number
    highlightedWords?: string[]
    description?: string
    onPress: () => void
}

function OptionButton({
    color,
    label,
    labelColor,
    labelSize,
    labelAlign,
    highlightedWords,
    SvgIcon,
    svgIconScale,
    leftSideColor = theme.orange2,
    leftSideWidth,
    description,
    onPress
}: OptionButtonProps) {
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

    const heightWithoutDescription = screenHeight * 0.1

    return (
        <TouchableContainer
            onPressIn={pressingButton}
            onPressOut={notPressingButton}
            onPress={releaseButton}
        >
            <ContainerBottom
                style={{
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
                            backgroundColor: leftSideColor,
                            width: leftSideWidth
                        }}
                    >
                        {SvgIcon && <SvgIcon height={svgIconScale?.[0]} width={svgIconScale?.[1]} />}
                    </IconArea>
                    <LabelDescriptionArea>
                        <ButtonLabel style={{
                            color: labelColor,
                            textAlign: labelAlign ? labelAlign : 'center',
                            fontSize: labelSize || 20,
                        }}>
                            {showMessageWithHighlight(label, highlightedWords)}
                        </ButtonLabel>
                        {
                            description &&
                            <ButtonDescription>
                                {description}
                            </ButtonDescription>
                        }
                    </LabelDescriptionArea>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer >
    )
}

export { OptionButton }