import React, { useState } from 'react'
import { KeyboardTypeOptions, NativeSyntheticEvent, ReturnKeyTypeOptions, TextInputKeyPressEventData, View } from 'react-native';
import { screenHeight, screenWidth } from '../../common/screenDimensions';

import { Container, TextInput } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../../common/theme';

interface LineInputProps {
    value: string
    relativeWidth: string
    textInputRef?: any
    previousInputRef?: any
    nextInputRef?: any
    defaultBackgroundColor: string
    defaultBorderBottomColor: string
    validBackgroundColor: string
    validBorderBottomColor: string
    invalidBackgroundColor?: string
    invalidBorderBottomColor?: string
    maxLength?: number
    secureTextEntry?: boolean
    invalidTextAfterSubmit?: boolean
    fontSize?: number
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
    multiline?: boolean
    placeholder?: string
    error?: boolean
    textIsValid?: boolean
    lastInput?: boolean
    keyboardType?: KeyboardTypeOptions
    blurOnSubmit?: boolean
    returnKeyType?: ReturnKeyTypeOptions
    onPressKeyboardSubmit?: () => void
    filterText?: (text: string) => string
    validateText?: (text: string) => boolean
    onChangeText: (text: string) => void
}

function LineInput({
    value,
    relativeWidth,
    textInputRef,
    previousInputRef,
    nextInputRef,
    defaultBackgroundColor,
    defaultBorderBottomColor,
    validBackgroundColor,
    validBorderBottomColor,
    invalidBackgroundColor = theme.red1,
    invalidBorderBottomColor = theme.red5,
    maxLength,
    secureTextEntry,
    invalidTextAfterSubmit = false,
    fontSize = 20,
    textAlign,
    multiline,
    placeholder,
    keyboardType,
    returnKeyType,
    blurOnSubmit = true,
    onPressKeyboardSubmit,
    error,
    lastInput,
    textIsValid = false,
    filterText,
    validateText = () => false,
    onChangeText
}: LineInputProps) {

    const [focused, setFocused] = useState<boolean>(false)
    const [validated, setValidated] = useState<boolean>(false)
    const [multilineInputHeight, setMultilineInputHeight] = useState(screenHeight * 0.1)

    const ValidateAndChange = (text: string) => {
        let filtredText = filterText ? filterText(text) : text
        if (validateText(filtredText) || textIsValid) {
            nextInputRef && setFocusToNextInput()
            lastInput && closeKeyboard()
            setValidated(true)
        } else {
            setValidated(false)
        }
        onChangeText(filtredText)
    }

    const performKeyPress = ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (nativeEvent.key === 'Backspace' && !value.length && previousInputRef) setFocusToPreviousInput()
    }

    const setFocusToNextInput = () => {
        nextInputRef.current.focus()
    }

    const setFocusToPreviousInput = () => {
        previousInputRef.current.focus()
    }

    const closeKeyboard = () => {
        textInputRef.current.blur()
    }

    const resizeMultilineInput = (height: number) => {
        if (!multiline) return
        if (height >= screenHeight * 0.1 && height < screenHeight * 0.25) {
            setMultilineInputHeight(height)
        }
    }

    const generateInputContainerStyle = () => {
        if (invalidTextAfterSubmit || error) return {
            borderBottomColor: invalidBorderBottomColor,
            backgroundColor: invalidBackgroundColor
        }

        return {
            borderBottomColor: validated || textIsValid ? validBorderBottomColor : defaultBorderBottomColor,
            backgroundColor: validated || textIsValid ? validBackgroundColor : defaultBackgroundColor
        }
    }

    const inputContainerStyle = {
        borderBottomWidth: focused || validated || textIsValid ? 5 : 2.5,
        ...generateInputContainerStyle()
    }

    const getTextInputStyle = () => {
        if (error) return { color: invalidBorderBottomColor }
        return {
            color: invalidTextAfterSubmit
                ? invalidBorderBottomColor
                : validated || textIsValid ? validBorderBottomColor : defaultBorderBottomColor,
            fontFamily: invalidTextAfterSubmit
                ? 'Arvo_400Regular'
                : validated || textIsValid ? 'Arvo_700Bold' : 'Arvo_400Regular'
        }
    }

    return (
        <Container
            style={{
                height: multiline ? multilineInputHeight : screenHeight * 0.1,// 0.25
                width: relativeWidth,
                ...inputContainerStyle
            }}
            activeOpacity={0}
            underlayColor={validated ? validBackgroundColor : defaultBackgroundColor}
            onPress={() => textInputRef.current.focus()}
        >
            <TextInput
                style={[getTextInputStyle(), {
                    fontSize: RFValue(fontSize),
                    textAlign: textAlign || 'center'
                }]}
                ref={textInputRef}
                value={value}
                maxLength={maxLength}
                multiline={multiline}
                numberOfLines={7}
                onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }) => resizeMultilineInput(height)}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType || 'ascii-capable'}
                placeholder={placeholder}
                returnKeyType={returnKeyType ? returnKeyType : lastInput ? 'done' : 'next'}
                blurOnSubmit={blurOnSubmit}
                onSubmitEditing={nextInputRef ? setFocusToNextInput : onPressKeyboardSubmit}
                onChangeText={(text) => ValidateAndChange(text)}
                onKeyPress={(key: NativeSyntheticEvent<TextInputKeyPressEventData>) => performKeyPress(key)}
            />
        </Container>
    );
}

export { LineInput }