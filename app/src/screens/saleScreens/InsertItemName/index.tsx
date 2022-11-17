import { Keyboard, StatusBar } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles';
import { theme } from '../../../common/theme';
import { screenHeight } from '../../../common/screenDimensions';
import Check from './../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions';
import { SaleContext } from '../../../contexts/SaleContext';
import { InsertItemNameScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps';

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer';
import { FormContainer } from '../../../components/_containers/FormContainer';
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton';
import { BackButton } from '../../../components/_buttons/BackButton';
import { InstructionCard } from '../../../components/_cards/InstructionCard';
import { LineInput } from '../../../components/LineInput';
import { ProgressBar } from '../../../components/ProgressBar';

function InsertItemName({ navigation }: InsertItemNameScreenProps) {

    const { setSaleDataOnContext} = useContext(SaleContext)

    const [itemName, setItemName] = useState<string>('')
    const [itemNameIsValid, setItemNameIsValid] = useState<boolean>(false)
    const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

    const inputRefs = {
        itemNameInput: useRef<React.MutableRefObject<any>>(null),
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
        const validation = validateItemName(itemName)
        setItemNameIsValid(validation)
    }, [itemName, keyboardOpened])

    const validateItemName = (text: string) => {
        const isValid = (text).trim().length >= 1
        if (isValid && !keyboardOpened) {
            return true
        }
        return false
    }

    const saveItemName = () => {
        if (itemNameIsValid) {
            setSaleDataOnContext({ itemName: itemName })
            navigation.navigate('InsertItemDescription')
        } 
    }

    return (
        <Container >
            <StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.green2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'que item você vai anunciar?'}
                    highlightedWords={['item']}
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
                    value={itemName}
                    relativeWidth={'100%'}
                    textInputRef={inputRefs.itemNameInput}
                    defaultBackgroundColor={theme.white2}
                    defaultBorderBottomColor={theme.black4}
                    validBackgroundColor={theme.green1}
                    validBorderBottomColor={theme.green5}
                    invalidBackgroundColor={theme.red1}
                    invalidBorderBottomColor={theme.red5}
                    maxLength={100}
                    lastInput={true}
                    textAlign={'left'}
                    fontSize={16}
                    placeholder={'ex: sofá quatro lugares usado'}
                    keyboardType={'default'}
                    textIsValid={itemNameIsValid && !keyboardOpened}
                    validateText={(text: string) => validateItemName(text)}
                    onChangeText={(text: string) => setItemName(text)}
                />
                <ButtonsContainer>
                    {
                        itemNameIsValid && !keyboardOpened &&
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveItemName}
                        />
                    }
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );
}

export { InsertItemName }