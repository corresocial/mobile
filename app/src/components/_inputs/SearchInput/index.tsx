import React, { useRef, useState } from 'react'
import { TextInputProps } from 'react-native'

import { useTheme } from 'styled-components'
import { Container, SideArea, TextInput } from './styles'
import LoupWhiteIcon from '../../../assets/icons/loup-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'

interface SearchInputProps extends TextInputProps {
	value: string
	validBackgroundColor?: string
	validateText?: (text: string) => void
	onChangeText: (text: string) => void
	onPressKeyboardSubmit?: () => void
}

function SearchInput({
	value,
	validBackgroundColor,
	placeholder,
	keyboardType,
	validateText,
	onPressKeyboardSubmit,
	onChangeText,
	...propsRest
}: SearchInputProps) {
	const theme = useTheme()
	const inputRef = useRef()

	const [focused, setFocused] = useState(false)

	const clearInput = () => onChangeText('')

	const somethingWasTyped = !!value.length

	return (
		<Container
			activeOpacity={1}
			textIsValid={validateText && validateText(value)}
			validBackgroundColor={validBackgroundColor}
			focused={focused}
		>
			{
				!somethingWasTyped && (
					<SideArea >
						<LoupWhiteIcon width={'50%'} height={'50%'} />
					</SideArea>
				)
			}
			<TextInput
				{...propsRest}
				ref={inputRef}
				value={value}
				keyboardType={keyboardType || 'ascii-capable'}
				placeholder={placeholder || 'buscar'}
				placeholderTextColor={theme.black1}
				returnKeyType={'search'}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onChangeText={onChangeText}
				onSubmitEditing={onPressKeyboardSubmit}
			/>
			{
				somethingWasTyped && (
					<SideArea onPress={clearInput}>
						<XWhiteIcon width={'50%'} height={'50%'} />
					</SideArea>
				)
			}
		</Container>
	)
}

export { SearchInput }
