import React from 'react'
import { Modal, Text, TouchableOpacity } from 'react-native'

import { Container, Content, TouchCloseArea } from './styles'

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
                <TouchCloseArea onPress={closeModal} >
                    <Text>1</Text>
                </TouchCloseArea>
                <Content>
                    <TouchableOpacity onPress={navigateToTour}>
                        <Text>CompleteModalProfile</Text>
                        <Text>CompleteModalProfile</Text>
                        <Text>CompleteModalProfile</Text>
                    </TouchableOpacity>
                </Content>
                <TouchCloseArea onPress={closeModal} >

                </TouchCloseArea>
            </Container>
        </Modal >
    )
}

export { CompleteProfileModal }