import { Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles';
import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';
import Check from './../../../assets/icons/check.svg'

import { InsertSocialImpactTitleScreenProps } from '../../../routes/Stack/socialImpactStack/stackScreenProps';
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';
import { SocialImpactContext } from '../../../contexts/SocialImpactContext';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertSocialImpactTitle({ navigation }: InsertSocialImpactTitleScreenProps) {

    const { socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)

    const [socialImpactTitle, setSocialImpactTitle] = useState<string>('')
    const [socialImpactTitleIsValid, setSocialImpactTitleIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        socialImpactTitleInput: useRef<React.MutableRefObject<any>>(null),
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
        const validation = validateSocialImpactTitle(socialImpactTitle)
        setSocialImpactTitleIsValid(validation)
    }, [socialImpactTitle, keyboardOpened])

    const validateSocialImpactTitle = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const saveSocialImpactTitle = () => {
        if (socialImpactTitleIsValid) {
            setSocialImpactDataOnContext({ title: socialImpactTitle })
            // navigation.navigate('InsertSocialImpactDescription')
        }
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.pink2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'qual é o nome da sua iniciativa?'}
                    highlightedWords={['nome', 'sua', 'iniciativa?']}
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
                    value={socialImpactTitle}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.socialImpactTitleInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.pink1}
                    validBorderBottomColor={theme.pink5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16}
                    placeholder={'ex: projeto criança vive'}
                    keyboardType={'default'}
                    textIsValid={socialImpactTitleIsValid && !keyboardOpened}
                    validateText={(text: string) => validateSocialImpactTitle(text)}
                    onChangeText={(text: string) => setSocialImpactTitle(text)}
                />
                <ButtonsContainer>
                    {
                        socialImpactTitleIsValid && !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveSocialImpactTitle}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertSocialImpactTitle }