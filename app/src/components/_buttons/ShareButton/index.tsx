import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

import { ButtonLabel, ContainerBottom, ContainerSurface, TouchableContainer } from './styles';
import { theme } from '../../../common/theme';
import { RFValue } from 'react-native-responsive-fontsize';

interface ShareButtonProps {
    color: string
    fontSize: number
    relativeWidth: string
    height: number
    onPress: () => void
}

function ShareButton({
    color,
    fontSize,
    relativeWidth,
    height,
    onPress }: ShareButtonProps) {
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
                    width: relativeWidth,
                    height: RFValue(height)
                }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        marginRight: buttonPressed ? RFValue(-4) : 0,
                        height: RFValue(height)
                    } as { [key: string]: React.CSSProperties }}>
                    <FontAwesome5
                        name={'share'}
                        size={13}
                        color={theme.black3}
                    />
                    <ButtonLabel
                        style={{
                            fontSize: fontSize,
                        }}
                    >
                        compartilhar
                    </ButtonLabel>
                </ContainerSurface>
            </ContainerBottom>
        </TouchableContainer>
    );
}

export { ShareButton }