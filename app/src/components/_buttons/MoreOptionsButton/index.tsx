import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

import {
    ContainerBottom,
    ContainerSurface,
    TouchableContainer
} from './styles'
import { theme } from '../../../common/theme'

interface MoreOptionsButtonProps {
    color: string
    height: number
    width: number
    onPress: () => void
}

function MoreOptionsButton({
    color,
    height,
    width,
    onPress }: MoreOptionsButtonProps) {

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

    return (
        <TouchableContainer
            onPressIn={pressingButton}
            onPressOut={notPressingButton}
            onPress={releaseButton}
        >
            <ContainerBottom
                style={{
                    width: RFValue(width),
                    height: RFValue(height)
                }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        marginRight: buttonPressed ? RFValue(-4) : 0,
                        height: RFValue(height)
                    } as { [key: string]: React.CSSProperties }}>
                    <Entypo
                        name={'dots-three-vertical'}
                        size={RFValue(20)}
                        color={theme.black3}
                    />
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer>
    )
}

export { MoreOptionsButton }