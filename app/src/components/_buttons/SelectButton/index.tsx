import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { ContainerBottom, ContainerSurface, Label } from './styles'
import { RFValue } from 'react-native-responsive-fontsize'
import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'

interface SelectButtonProps {
    width?: string | number
    height?: string | number
    marginVertical?: number
    marginHorizontal?: number
    backgroundColor?: string
    backgroundSelected?: string
    label?: string
    boldLabel?: boolean
    fontSize?: number
    selected?: boolean
    onSelect?: () => void
}

function SelectButton({
    width = screenWidth * 0.39,
    height = screenHeight * 0.09,
    marginVertical = RFValue(6),
    marginHorizontal = 0,
    backgroundColor = theme.white3,
    backgroundSelected,
    label,
    boldLabel = false,
    fontSize = 15,
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
                    marginVertical: RFValue(marginVertical),
                    marginHorizontal: RFValue(marginHorizontal),
                }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: selected ? backgroundSelected : backgroundColor,
                        marginRight: selected ? RFValue(-4) : buttonPressed ? RFValue(-7) : 0
                    }}
                >
                    <Label
                        style={{
                            fontSize: RFValue(fontSize),
                            fontFamily: selected || boldLabel ? 'Arvo_400Regular' : 'Arvo_700Bold'
                        }}
                    >
                        {label}
                    </Label>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableWithoutFeedback>
    )
}

export { SelectButton }