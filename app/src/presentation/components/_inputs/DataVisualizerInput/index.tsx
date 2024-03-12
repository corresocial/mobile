import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {
	InputContainer,
	InputInfoSection,
	InputText
} from './styles'

interface DataVisualizerInputProps {
	openPickerOnTouch: boolean,
	fields: string[],
	pickerType?: 'date' | 'time',
	defaultBackgroundColor: string,
	validBackgroundColor: string,
	onDateSelect?: (date: Date) => void

  }
  
function DataVisualizerInput({ 
	openPickerOnTouch = false,
	fields, 
	pickerType = 'date', 
	defaultBackgroundColor, 
	validBackgroundColor,
	onDateSelect
}: DataVisualizerInputProps) {
	const [isValid, setIsValid] = useState(false)
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [inputValues, setInputValues] = useState(fields.map((field, index) => ({ id: index, value: field })))

	const inputPressHandler = () => {
		if (openPickerOnTouch) {
			setDatePickerVisibility(true)
		}
	}

	const onPickerConfirmHandler = (info: Date) => {
		setDatePickerVisibility(false)
		let formattedValues: number[] = []
		switch (pickerType) {
			case 'date': {
				formattedValues = getFullDate(info)
				break
			}
			case 'time': {
				formattedValues = getFullTime(info)
				break
			}
		} 
		const clearedValues = inputValues.map((item, index) => ({ ...item, value: formattedValues[index].toString() }))
		setInputValues(clearedValues)
		onDateSelect?.(info)
		setIsValid(true)
	}

	const onPickerCancelHandler = () => {
		setDatePickerVisibility(false)
	}

	const getFullDate = (date: Date) => {
		return [
			date.getDate(),
			(date.getMonth() + 1),
			date.getFullYear()
		]
	} 

	const getFullTime = (date: Date) => {
		return [
			date.getHours(),
			date.getMinutes()
		]
	}
  
	return (
		<>
			<InputContainer 
				activeOpacity={1}
				onPress={inputPressHandler}
				defaultColor={defaultBackgroundColor}
				validColor={validBackgroundColor}
				valid={isValid}
			>
				{inputValues.map((item) => (
					<InputInfoSection key={item.id}>
						<InputText>
							{item.value} 
						</InputText>
					</InputInfoSection>
				))}
			</InputContainer>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode={pickerType}
				textColor={'black'}
				onConfirm={onPickerConfirmHandler}
				onCancel={onPickerCancelHandler}
			/>
		</>
	)
}

export { DataVisualizerInput }