import { Animated, Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';
import { ButtonsContainer, Container } from './styles';
import Check from './../../../assets/icons/check.svg'

import { InsertSaleValueScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { ServiceContext } from '../../../contexts/ServiceContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertSaleValue({ navigation, route }: InsertSaleValueScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const [saleValue, setSaleValue] = useState<string>('')
    const [saleValueIsValid, setSaleValueIsValid] = useState<boolean>(false)
    const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false)

    const inputRefs = {
        saleValueInput: useRef<React.MutableRefObject<any>>(null),
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true))
        Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false))

        const validation = validateSaleValue(saleValue)
        setSaleValueIsValid(validation)
    }, [saleValue, keyboardIsOpen])

    const validateSaleValue = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardIsOpen) {
            return true
        }
        return false
    }

    const saveSaleValue = () => {
        if (saleValueIsValid) {
            setServiceDataOnContext({ saleValue })
            if (route.params.anyPaymentType) {
                navigation.navigate('InsertExchangeValue')
            } else {
                navigation.navigate('InsertServicePrestationLocation')
            }
        } else {
            !saleValueIsValid
        }
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.28}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.purple2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'por quanto você vende?'}
                    highlightedWords={['quanto']}
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
                    value={saleValue}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.saleValueInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.purple1}
                    validBorderBottomColor={theme.purple5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    lastInput={true}
                    maxLength={100}
                    textAlign={'left'}
                    fontSize={20}
                    placeholder={'ex: 100'}
                    keyboardType={'numeric'}
                    textIsValid={saleValueIsValid && !keyboardIsOpen}
                    validateText={(text: string) => validateSaleValue(text)}
                    onChangeText={(text: string) => setSaleValue(text)}
                />
                <ButtonsContainer>
                    {
                        saleValueIsValid && !keyboardIsOpen &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveSaleValue}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertSaleValue }