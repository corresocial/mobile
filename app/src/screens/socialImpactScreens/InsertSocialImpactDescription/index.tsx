import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Check from './../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactDescriptionScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function InsertSocialImpactDescription({ navigation }: InsertSocialImpactDescriptionScreenProps) {

    const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)

    const [socialImpactDescription, setSocialImpactDescription] = useState<string>('')
    const [socialImpactDescriptionIsValid, setSocialImpactDescriptionIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        socialImpactDescriptionInput: useRef<React.MutableRefObject<any>>(null),
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            removeAllKeyboardEventListeners()
            Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
            Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
        })
        return unsubscribe
    }, [navigation])

    useEffect(() => {
        const validation = validateSocialImpactDescription(socialImpactDescription)
        setSocialImpactDescriptionIsValid(validation)

    }, [socialImpactDescription, keyboardOpened])

    const validateSocialImpactDescription = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const saveSocialImpactDescription = () => {
        if (socialImpactDescriptionIsValid) {
            setSocialImpactDataOnContext({ description: socialImpactDescription })
             navigation.navigate('InsertSocialImpactPicture')
        }
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.28}
                relativeHeight={'26%'}
                centralized
                backgroundColor={theme.pink2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'fala um pouco mais sobre a sua iniciativa'}
                    highlightedWords={['fala', 'um', 'pouco','sua', 'iniciativa']}
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
                    value={socialImpactDescription}
                    relativeWidth={'100%'}
                    initialNumberOfLines={2}
                    textInputRef={inputRefs.socialImpactDescriptionInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.pink1}
                    validBorderBottomColor={theme.pink5}
                    multiline
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16}
                    placeholder={'ex: descreva o que será feito, qual o objetivo, metas, etc...'}
                    keyboardType={'default'}
                    textIsValid={socialImpactDescriptionIsValid && !keyboardOpened}
                    validateText={(text: string) => validateSocialImpactDescription(text)}
                    onChangeText={(text: string) => setSocialImpactDescription(text)}
                />
                <ButtonsContainer>
                    {
                        socialImpactDescriptionIsValid && !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveSocialImpactDescription}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { InsertSocialImpactDescription }