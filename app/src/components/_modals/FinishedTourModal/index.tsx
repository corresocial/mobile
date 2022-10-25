import React from 'react'
import { Modal, StatusBar } from 'react-native'

import {
    Container,
    Content,
    Description,
    Question,
    Title,
    TouchCloseArea
} from './styles'
import { theme } from '../../../common/theme'
import RightCurvedArrow from './../../../assets/icons/right-curved-arrow.svg'

import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface FinishedTourModalProps {
    visibility: boolean
    closeModal: () => void
    onPressButton: () => void
}

function FinishedTourModal({ visibility, closeModal, onPressButton }: FinishedTourModalProps) {
    return (
        <Modal
            transparent={true}
            visible={visibility}
            animationType='fade'
            onRequestClose={closeModal}
        >
            <StatusBar backgroundColor={'rgba(0,0,0,0.5)'} barStyle={'dark-content'} />
            <Container>
                <TouchCloseArea onPress={closeModal} ></TouchCloseArea>
                <Content>
                    <Title>pronto!</Title>
                    <Description>
                        agora outros clientes e pessoas podem encontrar seu perfil e o que você vende!
                    </Description>
                    <Question>
                        que tal começar compartilhando, para ainda mais pessoas comprarem de você!?
                    </Question>
                    <PrimaryButton
                        color={theme.green3}
                        labelColor={theme.white3}
                        label={'compartilhar!'}
                        highlightedWords={['compartilhar!']}
                        fontSize={18}
                        SvgIcon={RightCurvedArrow}
                        svgIconScale={['40%', '16%']}
                        onPress={onPressButton}
                    />
                </Content>
                <TouchCloseArea onPress={closeModal} ></TouchCloseArea>
            </Container>
        </Modal >
    )
}

export { FinishedTourModal }