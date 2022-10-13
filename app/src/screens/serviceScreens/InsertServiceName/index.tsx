import { Animated, StatusBar } from 'react-native';
import React, { useContext, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles';
import { theme } from '../../../common/theme';
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions';
import Check from './../../../assets/icons/check.svg'

import { InsertServiceNameScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { ServiceContext } from '../../../contexts/ServiceContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertServiceName({ navigation, route }: InsertServiceNameScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const [serviceName, setServiceName] = useState<string>('')
    const [invalidServiceNameAfterSubmit, setInvalidServiceNameAfterSubmit] = useState<boolean>(false)

    const inputRefs = {
        descriptionInput: useRef<React.MutableRefObject<any>>(null),
    }

    const validateServiceName = (text: string) => {
        const isValid = (text).trim().length >= 10
        if (isValid) {
            setInvalidServiceNameAfterSubmit(false)
            return true
        }
        return false
    }

    const saveServiceName = () => {
        const serviceNameIsValid = validateServiceName(serviceName)
        if (serviceNameIsValid) {
            setServiceDataOnContext({ serviceName })
            navigation.navigate('InsertServicePicture')
        } else {
            !serviceNameIsValid && setInvalidServiceNameAfterSubmit(true)
        }
    }

    const someInvalidFieldSubimitted = () => {
        return invalidServiceNameAfterSubmit
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
            <StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
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
                            : 'qual serviço você vende?'
                    }
                    highlightedWords={
                        someInvalidFieldSubimitted()
                            ? ['\nmuito', 'curta']
                            : ['qual', 'serviço', 'vende?']
                    }
                >
                    <ProgressBar
                        range={5}
                        value={1}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <LineInput
                    value={serviceName}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.descriptionInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.purple1}
                    validBorderBottomColor={theme.purple5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    // multiline
                    textAlign={'left'}
                    invalidTextAfterSubmit={invalidServiceNameAfterSubmit}
                    fontSize={16}
                    placeholder={'motoboy para entregas'}
                    keyboardType={'default'}
                    validateText={(text: string) => validateServiceName(text)}
                    onChangeText={(text: string) => setServiceName(text)}

                />
                <ButtonsContainer>
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        color={someInvalidFieldSubimitted() ? theme.red3 : theme.green3}
                        label={'continuar'}
                        labelColor={theme.white3}
                        SvgIcon={Check}
                        svgIconScale={['30%', '15%']}
                        startsHidden={true}
                        onPress={saveServiceName}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertServiceName }