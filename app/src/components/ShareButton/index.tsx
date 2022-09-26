import React, { useState } from 'react'
import { FontAwesome5, FontAwesome5 as Icon } from '@expo/vector-icons';

import { showMessageWithHighlight } from '../../common/auxiliaryFunctions';
import { ButtonLabel, ContainerBottom, ContainerSurface, TouchableContainer } from './styles';
import { theme } from '../../common/theme';

interface ShareButtonProps {
    color: string
    fontSize: number
    relativeWidth: string
    onPress: () => void
}

function ShareButton({
    color,
    fontSize,
    relativeWidth,
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
                }}
            >
                <ContainerSurface
                    style={{
                        backgroundColor: color,
                        marginRight: buttonPressed ? -3 : 0,
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