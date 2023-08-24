import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FontAwesome5 } from '@expo/vector-icons'
import {
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	ReturnKeyTypeOptions,
	TouchableOpacity,
	TextInputKeyPressEventData,
	TextInputProps,
} from 'react-native'

import { BottomLine, Container, ContainerInner, TextInput } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'

interface DefaultInputProps extends TextInputProps {
	value: string
	relativeWidth?: string
	initialNumberOfLines?: number
	textInputRef?: any
	previousInputRef?: any
	nextInputRef?: any
	defaultBackgroundColor: string
	validBackgroundColor: string
	secureTextEntry?: boolean
	invalidTextAfterSubmit?: boolean
	fontSize?: number
	multiline?: boolean
	editable?: boolean
	placeholder?: string
	error?: boolean
	textIsValid?: boolean
	lastInput?: boolean
	keyboardType?: KeyboardTypeOptions
	blurOnSubmit?: boolean
	returnKeyType?: ReturnKeyTypeOptions
	selectTextOnFocus?: boolean
	onIconPress?: () => void
	onPressKeyboardSubmit?: () => void
	filterText?: (text: string) => string
	validateText?: (text: string) => boolean
	onChangeText: (text: string) => void
}

function DefaultInput({
	value,
	relativeWidth = '100%',
	initialNumberOfLines = 2,
	textInputRef,
	previousInputRef,
	nextInputRef,
	defaultBackgroundColor,
	validBackgroundColor,
	maxLength,
	secureTextEntry,
	invalidTextAfterSubmit = false,
	fontSize = 20,
	textAlign = 'center',
	multiline,
	editable,
	placeholder,
	keyboardType,
	returnKeyType,
	blurOnSubmit = true,
	onIconPress,
	onPressKeyboardSubmit,
	selectTextOnFocus,
	error,
	lastInput,
	textIsValid = false,
	filterText,
	validateText = () => false,
	onChangeText,
	...propsRest
}: DefaultInputProps) {
	const lineHeight = relativeScreenHeight(6)
	const minLineHeight = initialNumberOfLines * (initialNumberOfLines <= 2 ? relativeScreenHeight(5) : relativeScreenHeight(4.4))
	const maxLineHeight = relativeScreenHeight(25)

	const [focused, setFocused] = useState<boolean>(false)
	const [validated, setValidated] = useState<boolean>(false)
	const [multilineInputHeight, setMultilineInputHeight] = useState(minLineHeight)

	const ValidateAndChange = (text: string) => {
		const filtredText = filterText ? filterText(text) : text
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
		if (nativeEvent.key === 'Backspace' && (selectTextOnFocus ? true : !value.length) && previousInputRef) setFocusToPreviousInput()
	}

	const setFocusToNextInput = () => {
		nextInputRef.current.focus()
	}

	const setFocusToPreviousInput = () => {
		previousInputRef.current.focus()
	}

	const closeKeyboard = () => {
		textInputRef && textInputRef.current.blur()
	}

	const resizeMultilineInput = (height: number) => {
		if (!multiline) return
		if (height >= (multilineInputHeight - lineHeight) && height <= maxLineHeight) {
			setMultilineInputHeight(height + lineHeight) // borderBottom
		}
	}

	const generateInputContainerStyle = () => {
		const customDefaultBackgroundColor = textIsValid ? theme.white3 : defaultBackgroundColor

		if (invalidTextAfterSubmit || error) {
			return {
				backgroundColor: theme.red1,
			}
		}

		return {
			borderBottomColor: theme.black4,
			backgroundColor: validated || textIsValid ? validBackgroundColor : focused ? theme.white3 : customDefaultBackgroundColor
		}
	}

	const inputContainerStyle = {
		borderBottomWidth: focused || validated || textIsValid ? RFValue(4) : RFValue(2.5),
		...generateInputContainerStyle()
	}

	const getTextInputStyle = () => {
		return {
			color: theme.black4,
			fontFamily: invalidTextAfterSubmit
				? 'Arvo_400Regular'
				: validated || textIsValid ? 'Arvo_700Bold' : 'Arvo_400Regular'
		}
	}

	return (
		<Container
			width={relativeWidth}
			multiline={multiline}
			multilineInputHeight={multilineInputHeight}
			style={{ ...generateInputContainerStyle() }}
			activeOpacity={onIconPress ? 0.8 : 1}
			underlayColor={onIconPress ? 'transparent ' : validated ? validBackgroundColor : defaultBackgroundColor}
			onPress={() => textInputRef && textInputRef.current.focus()}
		>
			<ContainerInner hasIcon={!!onIconPress}>
				<TextInput
					{...propsRest}
					fontSize={fontSize}
					textAlign={textAlign}
					hasIcon={!!onIconPress}
					style={[getTextInputStyle()]}
					ref={textInputRef}
					value={value}
					maxLength={maxLength}
					editable={editable}
					multiline={multiline}
					numberOfLines={7}
					onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }: any) => resizeMultilineInput(height)}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType || 'ascii-capable'}
					placeholder={placeholder}
					returnKeyType={returnKeyType || (lastInput ? 'done' : 'next')}
					blurOnSubmit={blurOnSubmit}
					selectTextOnFocus={selectTextOnFocus}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					onSubmitEditing={nextInputRef ? setFocusToNextInput : onPressKeyboardSubmit}
					onChangeText={(text: string) => ValidateAndChange(text)}
					onKeyPress={(key: NativeSyntheticEvent<TextInputKeyPressEventData>) => performKeyPress(key)}
				/>
				{
					onIconPress
					&& (
						<TouchableOpacity onPress={onIconPress} >
							<FontAwesome5
								name={'minus'}
								size={RFValue(20)}
								color={theme.black4}
								style={{ padding: 15 }}
							/>
						</TouchableOpacity>
					)
				}
				<BottomLine style={{ ...inputContainerStyle }} />
			</ContainerInner>
		</Container>
	)
}

export { DefaultInput }
