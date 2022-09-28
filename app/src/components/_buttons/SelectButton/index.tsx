import React, { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'

import { ContainerBottom, ContainerSurface, Label } from './styles'

interface SelectButtonProps {
    width?: string | number
    height?: string | number
    backgroundColor?: string
    label?: string
    selected?: boolean
    onSelectCategory?: () => void
}

function SelectButton({
    width = screenWidth * 0.39,
    height = screenHeight * 0.09,
    backgroundColor = theme.white3,
    label,
    selected = false,
    onSelectCategory
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
        onSelectCategory && onSelectCategory()
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
                }}
            >
                <ContainerSurface
                style={{
                    backgroundColor: backgroundColor,
                    marginRight: buttonPressed ? -4 : 0
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