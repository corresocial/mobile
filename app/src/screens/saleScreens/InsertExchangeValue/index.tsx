import { Animated, Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';
import { ButtonsContainer, Container } from './styles';
import Check from './../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';
import { SaleContext } from '../../../contexts/SaleContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';
import { InsertExchangeValueScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps';

function InsertExchangeValue({ navigation }: InsertExchangeValueScreenProps) {

    const { setSaleDataOnContext } = useContext(SaleContext)

    const [exchangeValue, setExchangeValue] = useState<string>('')
    const [exchangeValueIsValid, setExchangeValueIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        exchangeValueInput: useRef<React.MutableRefObject<any>>(null),
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            removeAllKeyboardEventListeners()
            Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
            Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const validation = validateExchangeValue(exchangeValue)
        setExchangeValueIsValid(validation)
    }, [exchangeValue, keyboardOpened])

    const validateExchangeValue = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const saveExchangeValue = () => {
        const exchangeValueIsValid = validateExchangeValue(exchangeValue)
        if (exchangeValueIsValid) {
            setSaleDataOnContext({ exchangeValue })
            // navigation.navigate('InsertServicePrestationLocation')
        } else {
            !exchangeValueIsValid
        }
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'28%'}
                centralized
                backgroundColor={theme.green2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'o que você aceita em troca ?'}
                    highlightedWords={['o', 'que', 'em', 'troca']}
                >
                    <ProgressBar
                        range={5}
                        value={3}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <LineInput
                    value={exchangeValue}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.exchangeValueInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.green1}
                    validBorderBottomColor={theme.green5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    fontSize={20}
                    lastInput={true}
                    textAlign={'left'}
                    placeholder={'ex: troco por uma marmita'}
                    keyboardType={'default'}
                    textIsValid={exchangeValueIsValid && !keyboardOpened}
                    validateText={(text: string) => validateExchangeValue(text)}
                    onChangeText={(text: string) => setExchangeValue(text)}
                />
                <ButtonsContainer>
                    {
                        exchangeValueIsValid && !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveExchangeValue}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertExchangeValue }