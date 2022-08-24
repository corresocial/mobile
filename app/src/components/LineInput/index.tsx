import React, { useState } from 'react'
import { KeyboardTypeOptions, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

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
    maxLength: number
    secureTextEntry?: boolean
    invalidTextAfterSubmit: boolean
    placeholder?: string
    keyboardType?: KeyboardTypeOptions
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
    placeholder,
    keyboardType,
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
        if (invalidTextAfterSubmit) return {
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

    return (
        <Container
            style={{
                width: relativeWidth,
                ...inputContainerStyle
            }}
            activeOpacity={0}
            underlayColor={validated ? validBackgroundColor : defaultBackgroundColor}
            onPress={() => textInputRef.current.focus()}
        >
            <TextInput
                style={{
                    color: invalidTextAfterSubmit
                        ? (validated ? validBorderBottomColor : invalidBorderBottomColor)
                        : (validated ? validBorderBottomColor : defaultBorderBottomColor)
                }}
                ref={textInputRef}
                value={value}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType || 'ascii-capable'}

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