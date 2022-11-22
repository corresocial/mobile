import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Check from './../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertItemDescriptionScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function InsertItemDescription({ navigation }: InsertItemDescriptionScreenProps) {

    const { setSaleDataOnContext } = useContext(SaleContext)

    const [itemDescription, setItemDescription] = useState<string>('')
    const [itemDescriptionIsValid, setItemDescriptionIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        itemDescriptionInput: useRef<React.MutableRefObject<any>>(null),
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
        const validation = validateItemDescription(itemDescription)
        setItemDescriptionIsValid(validation)

    }, [itemDescription, keyboardOpened])

    const validateItemDescription = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const saveItemDescription = () => {
        if (itemDescriptionIsValid) {
            setSaleDataOnContext({ itemDescription })
            navigation.navigate('InsertSalePicture')
        }
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.28}
                relativeHeight={'26%'}
                centralized
                backgroundColor={theme.green2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'escreva uma descrição para o seu item'}
                    highlightedWords={['descrição', 'o', 'seu', 'item']}
                >
                    <ProgressBar
                        range={5}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white2}
                justifyContent={'center'}
            >
                <LineInput
                    value={itemDescription}
                    relativeWidth={'100%'}
                    initialNumberOfLines={2}
                    textInputRef={inputRefs.itemDescriptionInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.green1}
                    validBorderBottomColor={theme.green5}
                    multiline
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16}
                    placeholder={'ex: sofá azul, 1 ano de uso, manchado na parte de trás, etc...'}
                    keyboardType={'default'}
                    textIsValid={itemDescriptionIsValid && !keyboardOpened}
                    validateText={(text: string) => validateItemDescription(text)}
                    onChangeText={(text: string) => setItemDescription(text)}
                />
                <ButtonsContainer>
                    {
                        itemDescriptionIsValid && !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveItemDescription}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { InsertItemDescription }