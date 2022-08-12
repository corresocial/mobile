import React from 'react';
import {
    Modal
} from 'react-native';
import * as Linking from 'expo-linking'

import { theme } from '../../common/theme';
import { PrimaryButton } from '../PrimaryButton';
import { Container, LinkButtonsContainer } from './styles';

interface TermsOfServiceModalProps{
    visibility: boolean
    closeModal: () => void
}

function TermsOfServiceModal({ visibility, closeModal}: TermsOfServiceModalProps) {

    const redirectToUrl = (url: string) => {
        Linking.openURL(url);
    }
    
    return (
        <Modal visible={visibility} transparent animationType="fade">
            <Container >
                <LinkButtonsContainer>
                    <PrimaryButton
                        color={theme.background.tertiary}
                        label={'termos de serviço'}
                        highlightedWords={['termos', 'de', 'serviço']}
                        labelColor={theme.font.primary}
                        iconName={'plus'}
                        iconSize={24}
                        justifyContent={'space-between'}
                        onPress={() => redirectToUrl('https://www.google.com.br')}
                    />
                    <PrimaryButton
                        color={theme.background.tertiary}
                        label={'termos de privacidade'}
                        highlightedWords={['termos', 'privacidade']}
                        labelColor={theme.font.primary}
                        iconName={'plus'}
                        iconSize={24}
                        justifyContent={'space-between'}
                        onPress={() => redirectToUrl('https://www.google.com.br')}
                    />
                </LinkButtonsContainer>
                <PrimaryButton
                    color={theme.background.error}
                    label={'fechar'}
                    highlightedWords={['fechar']}
                    labelColor={theme.font.tertiary}
                    iconName={'window-close'}
                    iconSize={24}
                    onPress={closeModal}
                />
            </Container>
        </Modal>
    );
}

export { TermsOfServiceModal }
