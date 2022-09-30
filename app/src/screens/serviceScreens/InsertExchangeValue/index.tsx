import { Animated } from 'react-native';
import React, { useRef, useState } from 'react'

import { theme } from '../../../common/theme';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import { ButtonsContainer, Container } from './styles';
import Check from './../../../assets/icons/check.svg'

import { InsertExchangeValueScreenProps } from '../../../routes/Stack/_stackScreenProps';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertExchangeValue({ navigation }: InsertExchangeValueScreenProps) {

    const [exchangeValue, setExchangeValue] = useState<string>('')
    const [invalidExchangeValueAfterSubmit, setInvalidExchangeValueAfterSubmit] = useState<boolean>(false)

    const inputRefs = {
        exchangeValueInput: useRef<React.MutableRefObject<any>>(null),
    }

    const validateExchangeValue = (text: string) => {
        const isValid = (text).trim().length >= 5
        if (isValid) {
            setInvalidExchangeValueAfterSubmit(false)
            return true
        }
        return false
    }

    const saveExchangeValue = () => {
        const exchangeValueIsValid = validateExchangeValue(exchangeValue)
        if (exchangeValueIsValid) {
            // Save on store
            navigation.navigate('InsertServicePrestationLocation')
        } else {
            !exchangeValueIsValid && setInvalidExchangeValueAfterSubmit(true)
        }
    }

    const someInvalidFieldSubimitted = () => {
        return invalidExchangeValueAfterSubmit
    }

    const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
    const animateDefaultHeaderBackgound = () => {
        const existsError = someInvalidFieldSubimitted()

        Animated.timing(headerBackgroundAnimatedValue.current, {
            toValue: existsError ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()

        return headerBackgroundAnimatedValue.current.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.purple2, theme.red2],
        })
    }

    return (
        <Container >
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={animateDefaultHeaderBackgound()}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={
                        someInvalidFieldSubimitted()
                            ? 'não deu!\nparece esta descrição é \nmuito curta '
                            : 'o que você aceita em troca ?'
                    }
                    highlightedWords={
                        someInvalidFieldSubimitted()
                            ? ['\nmuito', 'curta']
                            : ['o', 'que', 'em', 'troca']
                    }
                >
                    <ProgressBar
                        range={4}
                        value={2}
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
                    validBackgroundColor={theme.purple1}
                    validBorderBottomColor={theme.purple5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    // multiline
                    textAlign={'left'}
                    invalidTextAfterSubmit={invalidExchangeValueAfterSubmit}
                    fontSize={20}
                    placeholder={'ex: troco por uma marmita'}
                    keyboardType={'default'}
                    validateText={(text: string) => validateExchangeValue(text)}
                    onChangeText={(text: string) => setExchangeValue(text)}

                />
                <ButtonsContainer> 
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        color={someInvalidFieldSubimitted() ? theme.red3: theme.green3}
                        label={'continuar'}
                        labelColor={theme.white3}
                        SvgIcon={Check}
                        svgIconScale={['30%', '15%']}
                        startsHidden={true}
                        onPress={saveExchangeValue}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertExchangeValue }