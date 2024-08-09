import React, { useState } from 'react'
import {
	KeyboardTypeOptions,
	NativeSyntheticEvent,
	ReturnKeyTypeOptions,
	TextInputKeyPressEventData,
	TextInputProps,
} from 'react-native'
import { SvgProps } from 'react-native-svg'

import { BottomLine, Container, ContainerInner, SideButtonContainer, TextInput } from './styles'
import MinusWhiteIcon from '@assets/icons/minus-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface DefaultInputProps extends TextInputProps {
	value: string
	relativeWidth?: string
	fixedHeight?: number
	initialNumberOfLines?: number
	textInputRef?: any
	previousInputRef?: any
	nextInputRef?: any
	defaultBackgroundColor: string
	validBackgroundColor: string
	invalidBackgroundColor?: string
	CustonLeftIcon?: React.FC<SvgProps>
	secureTextEntry?: boolean
	invalidTextAfterSubmit?: boolean
	fontSize?: number
	withoutBottomLine?: boolean
	multiline?: boolean
	hasMultipleInputs?: boolean
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
	fixedHeight,
	initialNumberOfLines = 1,
	textInputRef,
	previousInputRef,
	nextInputRef,
	defaultBackgroundColor,
	validBackgroundColor,
	invalidBackgroundColor,
	CustonLeftIcon,
	maxLength,
	secureTextEntry,
	invalidTextAfterSubmit = false,
	fontSize = 20,
	textAlign = 'center',
	withoutBottomLine,
	multiline,
	hasMultipleInputs,
	editable = true,
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
	const lineHeight = relativeScreenHeight(5.5)
	const minLineHeight = initialNumberOfLines * (initialNumberOfLines <= 2 ? relativeScreenHeight(5) : relativeScreenHeight(4.4))
	const maxLineHeight = relativeScreenHeight(25.5)

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

		if (height >= maxLineHeight) {
			setMultilineInputHeight(maxLineHeight)
			return
		}

		if (height <= multilineInputHeight) {
			setMultilineInputHeight(height + lineHeight)
			return
		}

		if (height >= multilineInputHeight && height <= maxLineHeight) {
			setMultilineInputHeight(height + lineHeight)
		}
	}

	const generateInputContainerStyle = () => {
		const customDefaultBackgroundColor = textIsValid ? theme.colors.white[3] : defaultBackgroundColor

		if (invalidTextAfterSubmit || error) {
			return {
				backgroundColor: invalidBackgroundColor || theme.colors.red[1],
			}
		}

		return {
			borderBottomColor: theme.colors.black[4],
			backgroundColor: validated || textIsValid ? validBackgroundColor : focused ? theme.colors.white[3] : customDefaultBackgroundColor
		}
	}

	const inputContainerStyle = {
		borderBottomWidth: focused || validated || textIsValid ? relativeScreenDensity(4) : relativeScreenDensity(2.5),
		...generateInputContainerStyle()
	}

	const getTextInputStyle = () => {
		return {
			color: theme.colors.black[4],
			fontFamily: invalidTextAfterSubmit
				? 'Arvo_400Regular'
				: validated || textIsValid ? 'Arvo_700Bold' : 'Arvo_400Regular'
		}
	}

	const moveToEditableInput = () => {
		uneditableMethod && uneditableMethod(value)
		onIconPress && onIconPress()
	}

	return (
		<Container
			width={relativeWidth}
			height={fixedHeight}
			multiline={multiline}
			hasMultipleInputs={hasMultipleInputs}
			multilineInputHeight={multilineInputHeight}
			onIconPress={!!onIconPress}
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
							<PlusWhiteIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
						</SideButtonContainer>
					)
				}
				{
					CustonLeftIcon && (
						<SideButtonContainer >
							<CustonLeftIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
						</SideButtonContainer>
					)
				}
				<TextInput
					showsVerticalScrollIndicator={false}
					{...propsRest}
					fontSize={fontSize}
					textAlign={textAlign}
					hasIcon={!!onIconPress}
					hasDoubleIcon={!!CustonLeftIcon}
					height={fixedHeight}
					style={[getTextInputStyle()]}
					ref={textInputRef}
					value={value}
					maxLength={maxLength}
					multiline={multiline}
					numberOfLines={onIconPress ? 3 : 7}
					onContentSizeChange={({ nativeEvent: { contentSize: { width, height } } }: any) => resizeMultilineInput(height)}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType || 'ascii-capable'}
					placeholder={placeholder}
					returnKeyType={returnKeyType || (lastInput ? 'done' : 'next')}
					blurOnSubmit={blurOnSubmit}
					// editable={editable}
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
							<MinusWhiteIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
						</SideButtonContainer>
					)
				}
				{!withoutBottomLine && <BottomLine style={{ ...inputContainerStyle }} />}
			</ContainerInner>
		</Container>
	)
}

export { DefaultInput }
