import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	ReturnKeyTypeOptions,
	TextInputKeyPressEventData,
	TextInputProps,
} from 'react-native'

import { BottomLine, Container, ContainerInner, SideButtonContainer, TextInput } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import MinusWhiteIcon from '../../../assets/icons/minus-white.svg'
import PlusWhiteIcon from '../../../assets/icons/plusTabIconInactive.svg'

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
	withoutBottomLine?: boolean
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
	iconPosition?: 'left' | 'right'
	uneditableMethod?: (text: string) => void
	onIconPress?: (() => void) | null
	onPressKeyboardSubmit?: () => void
	filterText?: (text: string) => string
	validateText?: (text: string) => boolean
	onChangeText: (text: string) => void
}

function DefaultInput({
	value,
	relativeWidth = '100%',
	initialNumberOfLines = 1,
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
	withoutBottomLine,
	multiline,
	editable,
	placeholder,
	keyboardType,
	returnKeyType,
	blurOnSubmit = true,
	iconPosition = 'right',
	onIconPress,
	uneditableMethod,
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
	const maxLineHeight = relativeScreenHeight(20)

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

	const moveToEditableInput = () => {
		/* uneditableMethod && uneditableMethod(value)
		onIconPress && onIconPress() */
	}

	return (
		<Container
			width={relativeWidth}
			multiline={multiline}
			multilineInputHeight={multilineInputHeight}
			style={{ ...generateInputContainerStyle() }}
			activeOpacity={onIconPress ? 0.8 : 1}
			underlayColor={onIconPress ? 'transparent ' : validated ? validBackgroundColor : defaultBackgroundColor}
			onPress={() => (!editable ? moveToEditableInput() : textInputRef && textInputRef.current.focus())}
		>
			<ContainerInner hasIcon={!!onIconPress}>
				{
					onIconPress && iconPosition === 'left'
					&& (
						<SideButtonContainer onPress={onIconPress} >
							<PlusWhiteIcon width={RFValue(30)} height={RFValue(30)} />
						</SideButtonContainer>
					)
				}
				<TextInput
					{...propsRest}
					fontSize={fontSize}
					textAlign={textAlign}
					hasIcon={!!onIconPress}
					style={[getTextInputStyle()]}
					ref={textInputRef}
					value={value}
					maxLength={maxLength}
					multiline={multiline}
					numberOfLines={7}
					onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }: any) => resizeMultilineInput(height)}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType || 'ascii-capable'}
					placeholder={placeholder}
					returnKeyType={returnKeyType || (lastInput ? 'done' : 'next')}
					blurOnSubmit={blurOnSubmit}
					editable={editable}
					selectTextOnFocus={selectTextOnFocus}
					onFocus={() => (editable ? setFocused(true) : moveToEditableInput())}
					onBlur={() => setFocused(false)}
					onSubmitEditing={nextInputRef ? setFocusToNextInput : onPressKeyboardSubmit}
					onChangeText={(text: string) => ValidateAndChange(text)}
					onKeyPress={(key: NativeSyntheticEvent<TextInputKeyPressEventData>) => performKeyPress(key)}
				/>
				{
					onIconPress && iconPosition === 'right'
					&& (
						<SideButtonContainer onPress={onIconPress} >
							<MinusWhiteIcon width={RFValue(30)} height={RFValue(30)} />
						</SideButtonContainer>
					)
				}
				{!withoutBottomLine && <BottomLine style={{ ...inputContainerStyle }} />}
			</ContainerInner>
		</Container>
	)
}

export { DefaultInput }
