import { Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles';
import { screenHeight } from '../../../common/screenDimensions';
import { theme } from '../../../common/theme';
import Check from './../../../assets/icons/check.svg'

import { InsertProfileDescriptionScreenProps } from '../../../routes/Stack/_stackScreenProps';
import { ServiceContext } from '../../../contexts/ServiceContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { BackButton } from '../../../components/_buttons/BackButton';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { InstructionCard } from '../../../components/InstructionCard';
import { ProgressBar } from '../../../components/ProgressBar';
import { LineInput } from '../../../components/LineInput';

function InsertProfileDescription({ navigation }: InsertProfileDescriptionScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const [profileDescription, setProfileDescription] = useState<string>('')
    const [profileDescriptionIsValid, setProfileDescriptionIsValid] = useState<boolean>(false)
    const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false)

    const inputRefs = {
        descriptionInput: useRef<React.MutableRefObject<any>>(null),
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true))
        Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false))

        const validation = validateProfileDescription(profileDescription)
        setProfileDescriptionIsValid(validation)
    }, [profileDescription, keyboardIsOpen])

    const validateProfileDescription = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardIsOpen) {
            return true
        }
        return false
    }

    const saveProfileDescription = () => {
        if (profileDescriptionIsValid) {
            setServiceDataOnContext({ profileDescription })
            navigation.navigate('InsertServiceName')
        } else {
            !profileDescriptionIsValid
        }
    }

    const statusBarHeight = StatusBar.currentHeight || 0

    return (
        <Container >
            <StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'26%'}
                centralized
                backgroundColor={theme.purple2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'escreva uma descrição para o seu perfil'}
                    highlightedWords={['descrição', 'seu', 'perfil']}
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
                    value={profileDescription}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.descriptionInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.purple1}
                    validBorderBottomColor={theme.purple5}
                    multiline
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16}
                    placeholder={'ex: trabalho de mecânico, tenho 33 anos, etc...'}
                    keyboardType={'default'}
                    textIsValid={profileDescriptionIsValid && !keyboardIsOpen}
                    validateText={(text: string) => validateProfileDescription(text)}
                    onChangeText={(text: string) => setProfileDescription(text)}
                />
                <ButtonsContainer>
                    {
                        profileDescriptionIsValid && !keyboardIsOpen &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveProfileDescription}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertProfileDescription }