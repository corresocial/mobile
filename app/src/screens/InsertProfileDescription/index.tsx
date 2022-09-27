import { Animated, StatusBar } from 'react-native';
import React, { useRef, useState } from 'react'

import { ButtonsContainer, Container, InputsContainer } from './styles';
import { screenHeight } from '../../common/screenDimensions';
import { theme } from '../../common/theme';
import Check from './../../assets/icons/check.svg'

import { InsertProfileDescriptionScreenProps } from '../../routes/Stack/stackScreenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { BackButton } from '../../components/BackButton';

function InsertProfileDescription({ navigation, route }: InsertProfileDescriptionScreenProps) {

    const [profileDescription, setProfileDescription] = useState<string>('')
    const [invalidProfileDescriptionAfterSubmit, setInvaliProfileDescriptionAfterSubmit] = useState<boolean>(false)

    const inputRefs = {
        descriptionInput: useRef<React.MutableRefObject<any>>(null),
    }

    const validateProfileDescription = (text: string) => {
        const isValid = (text).trim().length >= 10
        if (isValid) {
            setInvaliProfileDescriptionAfterSubmit(false)
            return true
        }
        return false
    }

    const saveProfileDescription = () => {
        const profileDescriptionIsValid = validateProfileDescription(profileDescription)
        if (profileDescriptionIsValid) {
            // Save on store
            navigation.navigate('InsertServiceName')
        } else {
            !profileDescriptionIsValid && setInvaliProfileDescriptionAfterSubmit(true)
        }
    }

    const someInvalidFieldSubimitted = () => {
        return invalidProfileDescriptionAfterSubmit
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

    const statusBarHeight = StatusBar.currentHeight || 0

    return (
        <Container >
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'26%'}
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
                            : 'escreva uma descrição para o seu perfil'
                    }
                    highlightedWords={
                        someInvalidFieldSubimitted()
                            ? ['\nmuito', 'curta']
                            : ['descrição', 'seu', 'perfil']
                    }
                >
                    <ProgressBar
                        range={4}
                        value={1}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <LineInput
                    value={profileDescription}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.descriptionInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.purple1}
                    validBorderBottomColor={theme.purple5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    // maxLength={0}
                    multiline
                    textAlign={'left'}
                    invalidTextAfterSubmit={invalidProfileDescriptionAfterSubmit}
                    fontSize={16}
                    placeholder={'ex: trabalho de mecânico, tenho 33 anos, etc...'}
                    keyboardType={'default'}
                    validateText={(text: string) => validateProfileDescription(text)}
                    onChangeText={(text: string) => setProfileDescription(text)}

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
                        onPress={saveProfileDescription}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertProfileDescription }