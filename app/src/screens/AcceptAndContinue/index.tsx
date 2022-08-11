import React, { useState } from 'react'
import {  Alert } from 'react-native';

import {
    Container,
    CarouselContainer,
    TermsButtonContainer,
    CarouselItemContainer,
    Slogan,
    TermsLabel,
    TermsLabelHighlight
} from './styles';

import Logo from './../../assets/svgs/logo.svg'
import { theme } from '../../common/theme';
import { screenHeight, screenWidth } from '../../common/screenDimensions';

import { CustomCarousel } from './../../components/CustomCarousel'
import { InstructionCard } from '../../components/InstructionCard';
import { PrimaryButton } from '../../components/PrimaryButton';

const presentationTexts = [
    'rede social, de verdade',
    'aqui você pode anunciar seu trampo, vender coisas usadas e encontrar novas oportunidades para fazer um dinheiro.',
    'além disso, quando você usa o corre, você ajuda outras pessoas com nossas iniciativas sociais.',
];

function AcceptAndContinue() {

    const [termsVisibility, setTermsVisibility] = useState<boolean>(false)

    const showTermsOfServiceModal = () => {
        setTermsVisibility(true)
        Alert.alert('Ops!', 'Logo vai estar funfando, aguenta aí!')
    }

    const hideTermsOfServiceModal = () => {

    }

    return (
        <Container >
            <CarouselContainer>
                <CustomCarousel>
                    <CarouselItemContainer >
                        <Logo height={screenHeight * 0.07} width={screenWidth * 0.5} />
                        <Slogan>{presentationTexts[0]}</Slogan>
                    </CarouselItemContainer>
                    <CarouselItemContainer>
                        <InstructionCard
                            message={presentationTexts[1]}
                            highlightedWords={['anunciar', 'vender','encontrar','fazer', 'um', 'dinheiro.']}
                        />
                    </CarouselItemContainer>
                    <CarouselItemContainer>
                        <InstructionCard
                         message={presentationTexts[2]} 
                         highlightedWords={['usa', 'o', 'corre,', 'ajuda', 'iniciativas','sociais.']}
                         />
                    </CarouselItemContainer>
                </CustomCarousel>
            </CarouselContainer>
            <TermsButtonContainer>
                <TermsLabel>
                    ao clicar em "aceitar e continuar" você aceita com os
                    <TermsLabelHighlight onPress={showTermsOfServiceModal}>
                        {' '}termos de serviço e privacidade{' '}
                    </TermsLabelHighlight>
                    do corre.social
                </TermsLabel>
                <PrimaryButton
                    label='aceitar e continuar'
                    labelColor={theme.font.primary}
                    color={theme.background.primary}
                    highlightedWords={['continuar']}
                />
            </TermsButtonContainer>
        </Container>
    );
}

export { AcceptAndContinue }