import React from 'react'
import { Modal } from 'react-native'
import * as Linking from 'expo-linking'

import { theme } from '../../../common/theme'
import { Container, LinkButtonsContainer } from './styles'

import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface TermsOfServiceModalProps {
    visibility: boolean
    closeModal: () => void
}

function TermsOfServiceModal({ visibility, closeModal }: TermsOfServiceModalProps) {

    const redirectToUrl = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <Modal visible={visibility} transparent animationType='fade'>
            <Container >
                <LinkButtonsContainer>
                    <PrimaryButton
                        color={theme.white3}
                        label={'termos de serviço'}
                        fontSize={16}
                        highlightedWords={['termos', 'de', 'serviço']}
                        labelColor={theme.black4}
                        iconName={'plus'}
                        iconSize={22}
                        justifyContent={'space-between'}
                        onPress={() => redirectToUrl('https://www.google.com.br')}
                    />
                    <PrimaryButton
                        color={theme.white3}
                        label={'termos de privacidade'}
                        fontSize={16}
                        highlightedWords={['termos', 'privacidade']}
                        labelColor={theme.black4}
                        iconName={'plus'}
                        iconSize={22}
                        justifyContent={'space-between'}
                        onPress={() => redirectToUrl('https://www.google.com.br')}
                    />
                </LinkButtonsContainer>
                <PrimaryButton
                    color={theme.red3}
                    label={'fechar'}
                    fontSize={18}
                    highlightedWords={['fechar']}
                    labelColor={theme.white3}
                    iconName={'window-close'}
                    iconSize={20}
                    onPress={closeModal}
                />
            </Container>
        </Modal>
    )
}

export { TermsOfServiceModal }
