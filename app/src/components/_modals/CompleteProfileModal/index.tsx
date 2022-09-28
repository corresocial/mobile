import React from 'react'
import { Modal } from 'react-native'

import {
    Container,
    Content,
    Description,
    Question,
    Title,
    TouchCloseArea
} from './styles'
import { theme } from '../../../common/theme'
import Check from './../../../assets/icons/check.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface CompleteProfileModalProps {
    visibility: boolean
    closeModal: () => void
    navigateToTour: () => void
}

function CompleteProfileModal({ visibility, closeModal, navigateToTour }: CompleteProfileModalProps) {

    return (
        <Modal
            transparent={true}
            visible={visibility}
            animationType='fade'

            onRequestClose={closeModal}
        >
            <Container>
                <TouchCloseArea onPress={closeModal} ></TouchCloseArea>
                <Content>
                    <Title>legal!</Title>
                    <Description>
                        {showMessageWithHighlight(
                            'primeiro precisamos preencher seu perfil, para que outros possam te encontrar',
                            ['primeiro', 'preencher', 'seu', 'perfil,', 'te', 'encontrar']
                        )}
                    </Description>
                    <Question>
                        {showMessageWithHighlight(
                            'demora 5 minutos, bora?',
                            ['5', 'minutos,']
                        )}

                    </Question>
                    <PrimaryButton
                        color={theme.green3}
                        labelColor={theme.white3}
                        label={'bora!'}
                        highlightedWords={['bora!']}
                        fontSize={22}
                        SvgIcon={Check}
                        svgIconScale={['30%', '11%']}
                        onPress={navigateToTour}
                    />
                </Content>
                <TouchCloseArea onPress={closeModal} ></TouchCloseArea>
            </Container>
        </Modal >
    )
}

export { CompleteProfileModal }