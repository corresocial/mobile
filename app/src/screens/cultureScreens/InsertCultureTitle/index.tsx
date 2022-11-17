import { Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles';
import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';
import Check from './../../../assets/icons/check.svg'

import { InsertCultureTitleScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps';
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';
import { CultureContext } from '../../../contexts/CultureContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertCultureTitle({ navigation }: InsertCultureTitleScreenProps) {

    const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)

    const [cultureTitle, setCultureTitle] = useState<string>('')
    const [cultureTitleIsValid, setCultureTitleIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        cultureTitleInput: useRef<React.MutableRefObject<any>>(null),
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
        const validation = validateCultureTitle(cultureTitle)
        setCultureTitleIsValid(validation)
    }, [cultureTitle, keyboardOpened])

    const validateCultureTitle = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const saveCultureTitle = () => {
        if (cultureTitleIsValid) {
            setCultureDataOnContext({ title: cultureTitle })
            navigation.navigate('InsertCultureDescription')
        }
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.blue2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={
                        cultureDataContext.cultureType === 'artistProfile'
                            ? 'que arte você cria?'
                            : 'qual o nome do evento?'
                    }
                    highlightedWords={
                        cultureDataContext.cultureType === 'artistProfile'
                            ? ['arte']
                            : ['nome']
                    }
                >
                    <ProgressBar
                        range={cultureDataContext.cultureType === 'artistProfile' ? 3 : 5}
                        value={1}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <LineInput
                    value={cultureTitle}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.cultureTitleInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.blue1}
                    validBorderBottomColor={theme.blue5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16} 
                    placeholder={
                        cultureDataContext.cultureType === 'artistProfile'
                            ? 'ex: componho músicas'
                            : 'ex: bazar de livros'
                    }
                    keyboardType={'default'}
                    textIsValid={cultureTitleIsValid && !keyboardOpened}
                    validateText={(text: string) => validateCultureTitle(text)}
                    onChangeText={(text: string) => setCultureTitle(text)}
                />
                <ButtonsContainer>
                    {
                        cultureTitleIsValid && !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveCultureTitle}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertCultureTitle }