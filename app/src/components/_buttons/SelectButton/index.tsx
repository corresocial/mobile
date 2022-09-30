import React, { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'

import { ContainerBottom, ContainerSurface, Label } from './styles'

interface SelectButtonProps {
    width?: string | number
    height?: string | number
    margin?: number
    backgroundColor?: string
    backgroundSelected?: string
    label?: string
    selected?: boolean
    onSelect?: () => void
}

function SelectButton({
    width = screenWidth * 0.39,
    height = screenHeight * 0.09,
    margin = screenWidth * 0.015,
    backgroundColor = theme.white3,
    backgroundSelected,
    label,
    selected = false,
    onSelect
}: SelectButtonProps) {

    const [buttonPressed, setButtomPressed] = useState<Boolean>(false)

    function pressingButton() {
        setButtomPressed(true)
    }

    function notPressingButton() {
        setButtomPressed(false)
    }

    function releaseButton() {
        setButtomPressed(false)
        onSelect && onSelect()
    }

    return (
        <TouchableWithoutFeedback
            onPressIn={pressingButton}
            onPressOut={notPressingButton}
            onPress={releaseButton}
        >
            <ContainerBottom
                style={{
                    width: width,
                    height: height,
                    margin: margin
                }}
            >
                <ContainerSurface
                style={{
                    backgroundColor: selected ? backgroundSelected : backgroundColor,
                    marginRight: buttonPressed || selected? -4 : 0
                }}
                >
                    <Label>
                        {label}
                    </Label>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableWithoutFeedback>
    )
}

export { SelectButton }