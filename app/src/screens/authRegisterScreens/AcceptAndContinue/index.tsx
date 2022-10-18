import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar } from 'react-native';

import {
    Container,
    TermsButtonContainer,
    CarouselItemContainer,
    Slogan,
    TermsLabel,
    TermsLabelHighlight
} from './styles';
import { theme } from '../../../common/theme';
import { screenHeight, screenWidth } from '../../../common/screenDimensions';
import Logo from './../../../assets/icons/logo.svg'

import { AcceptAndContinueScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { TermsOfServiceModal } from '../../../components/_modals/TermsOfServiceModal';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { CustomCarousel } from '../../../components/CustomCarousel'
import { InstructionCard } from '../../../components/InstructionCard';

const presentationTexts = [
    'rede social, de verdade',
    'aqui você pode anunciar seu trampo, vender coisas usadas e encontrar novas oportunidades para fazer um dinheiro.',
    'além disso, quando você usa o corre, você ajuda outras pessoas com nossas iniciativas sociais.',
]

function AcceptAndContinue({ navigation }: AcceptAndContinueScreenProps) {

    const [termsVisibility, setTermsVisibility] = useState<boolean>(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
    })

    const onPressBackHandler = () => {
        if (navigation.isFocused()) {
            BackHandler.exitApp()
            return true
        } else {
            return false
        }
    }

    const showTermsOfServiceModal = () => {
        setTermsVisibility(true)
    }

    const hideTermsOfServiceModal = () => {
        setTermsVisibility(false)
    }

    const navigateToInsertPhoneScreen = () => {
        navigation.navigate('InsertPhone')
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'}/>
            <TermsOfServiceModal visibility={termsVisibility} closeModal={hideTermsOfServiceModal} />
            <DefaultHeaderContainer relativeHeight='55%' backgroundColor={theme.orange2} withoutPadding>
                <CustomCarousel>
                    <CarouselItemContainer >
                        <Logo height={screenHeight * 0.07} width={screenWidth * 0.5} />
                        <Slogan>{presentationTexts[0]}</Slogan>
                    </CarouselItemContainer>
                    <CarouselItemContainer>
                        <InstructionCard
                            message={presentationTexts[1]}
                            highlightedWords={['anunciar', 'vender', 'encontrar', 'fazer', 'um', 'dinheiro.']}
                            flex={0}
                        />
                    </CarouselItemContainer>
                    <CarouselItemContainer>
                        <InstructionCard
                            message={presentationTexts[2]}
                            highlightedWords={['usa', 'o', 'corre,', 'ajuda', 'iniciativas', 'sociais.']}
                            flex={0}
                        />
                    </CarouselItemContainer>
                </CustomCarousel>
            </DefaultHeaderContainer>
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
                    labelColor={theme.black4}
                    iconName={'arrow-right'}
                    color={theme.orange3}
                    highlightedWords={['continuar']}
                    onPress={navigateToInsertPhoneScreen}
                />
            </TermsButtonContainer>
        </Container>
    );
}

export { AcceptAndContinue }