import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FontAwesome5 } from '@expo/vector-icons'
import {
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	ReturnKeyTypeOptions,
	TouchableOpacity,
	TextInputKeyPressEventData,
	View
} from 'react-native'

import { Container, TextInput } from './styles'
import { relativeScreenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'

interface LineInputProps {
	value: string
	relativeWidth: string
	relativeHeight?: number
	initialNumberOfLines?: number
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
	textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined
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

function LineInput({
	value,
	relativeWidth,
	relativeHeight,
	initialNumberOfLines = 2,
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
	onChangeText
}: LineInputProps) {
	const lineHeight = relativeScreenHeight(5)
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
		if (height >= (initialNumberOfLines * lineHeight) && height < maxLineHeight) {
			setMultilineInputHeight(height + 3) // borderBottom
		}
	}

	const generateInputContainerStyle = () => {
		if (invalidTextAfterSubmit || error) {
			return {
				borderBottomColor: invalidBorderBottomColor,
				backgroundColor: invalidBackgroundColor,
			}
		}

		return {
			borderBottomColor: validated || textIsValid ? theme.black4 : defaultBorderBottomColor,
			backgroundColor: validated || textIsValid ? validBackgroundColor : defaultBackgroundColor
		}
	}

	const inputContainerStyle = {
		borderBottomWidth: focused || validated || textIsValid ? 5 : 2.5,
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
			style={{
				height: multiline ? multilineInputHeight : relativeScreenHeight(8), // 0.25
				width: relativeWidth,
				...inputContainerStyle,
			}}
			activeOpacity={onIconPress ? 0.8 : 0}
			underlayColor={onIconPress ? 'transparent ' : validated ? validBackgroundColor : defaultBackgroundColor}
			onPress={() => textInputRef.current.focus()}
		>
			<View
				style={onIconPress && {
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<TextInput
					style={[getTextInputStyle(), {
						fontSize: RFValue(fontSize),
						textAlign: textAlign || 'center',
						textAlignVertical: multiline ? 'top' : 'center',
						width: onIconPress ? '85%' : '100%'
					}]}
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
								color={validBorderBottomColor}
								style={{
									padding: 15,
								}}
							/>
						</TouchableOpacity>
					)
				}
			</View>
		</Container>
	)
}

export { LineInput }
