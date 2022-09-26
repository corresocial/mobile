import React, { useState } from 'react'
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { screenWidth } from '../../common/screenDimensions';

import { Container, TextInput } from './styles';

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
    invalidBackgroundColor: string
    invalidBorderBottomColor: string
    maxLength?: number
    secureTextEntry?: boolean
    invalidTextAfterSubmit: boolean
    fontSize?: number
    textAlign?: string
    multiline?: boolean
    placeholder?: string
    keyboardType?: KeyboardTypeOptions
    error?: boolean
    lastInput?: boolean
    filterText?: (text: string) => string
    validateText: (text: string) => boolean
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
    invalidBackgroundColor,
    invalidBorderBottomColor,
    maxLength,
    secureTextEntry,
    invalidTextAfterSubmit,
    fontSize,
    textAlign,
    multiline,
    placeholder,
    keyboardType,
    error,
    lastInput,
    filterText,
    validateText,
    onChangeText
}: LineInputProps) {

    const [focused, setFocused] = useState<boolean>(false)
    const [validated, setValidated] = useState<boolean>(false)

    const ValidateAndChange = (text: string) => {
        let filtredText = filterText ? filterText(text) : text

        if (validateText(filtredText)) {
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

    const generateInputContainerStyle = () => {
        if (invalidTextAfterSubmit || error) return {
            borderBottomColor: invalidBorderBottomColor,
            backgroundColor: invalidBackgroundColor
        }

        return {
            borderBottomColor: validated ? validBorderBottomColor : defaultBorderBottomColor,
            backgroundColor: validated ? validBackgroundColor : defaultBackgroundColor
        }
    }

    const inputContainerStyle = {
        borderBottomWidth: focused || validated ? 5 : 2.5,
        ...generateInputContainerStyle()
    }

    const getTextInputStyle = () => {
        if (error) return { color: invalidBorderBottomColor }
        return {
            color: invalidTextAfterSubmit
                ? invalidBorderBottomColor
                : validated ? validBorderBottomColor : defaultBorderBottomColor
        }
    }

    return (
        <Container
            style={{
                height: screenWidth * 0.17,
                width: relativeWidth,
                ...inputContainerStyle
            }}
            activeOpacity={0}
            underlayColor={validated ? validBackgroundColor : defaultBackgroundColor}
            onPress={() => textInputRef.current.focus()}
        >
            <TextInput
                style={[getTextInputStyle(), {
                    fontSize: fontSize,
                    textAlign: textAlign as any //TODO Type
                }]}
                ref={textInputRef}
                value={value}
                maxLength={maxLength}
                multiline={multiline}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType || 'ascii-capable'}
                placeholder={placeholder}
                onChangeText={(text) => ValidateAndChange(text)}
                returnKeyType={lastInput ? 'done' : 'next'}
                onFocus={(() => setFocused(true))}
                onBlur={() => setFocused(false)}
                onKeyPress={(key: NativeSyntheticEvent<TextInputKeyPressEventData>) => performKeyPress(key)}
            />
        </Container>
    );
}

export { LineInput }