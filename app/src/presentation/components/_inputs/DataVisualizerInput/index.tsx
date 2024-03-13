import React, { useEffect, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

import {
	InputContainer,
	InputInfoSection,
	InputText
} from './styles'

interface DataVisualizerInputProps {
	openPickerOnTouch: boolean,
	fields: string[],
	initialValue?: Date,
	pickerType?: 'date' | 'time',
	defaultBackgroundColor: string,
	validBackgroundColor: string,
	onDateSelect?: (date: Date) => void
  }
  
function DataVisualizerInput({ 
	openPickerOnTouch = false,
	fields, 
	initialValue,
	pickerType = 'date', 
	defaultBackgroundColor, 
	validBackgroundColor,
	onDateSelect
}: DataVisualizerInputProps) {
	type InputValuesType = {id: number, value: string}
	
	const [isValid, setIsValid] = useState(false)
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [inputValues, setInputValues] = useState<InputValuesType[]>([])

	useEffect(() => {
		// console.log(!initialValue === false)
		// if (initialValue) {
		// 	const newDate = getNewDate(initialValue)
		// 	const formattedValues = convertDateTimeToArrayValues(newDate)
		// 	populateInputValues(formattedValues)
		// 	return
		// }
		populateInputValues(fields)
	}, [])

	const inputPressHandler = () => {
		console.log('oi')
		if (openPickerOnTouch) {
			console.log('tchau')

			setDatePickerVisibility(true)
		}
	}

	const populateInputValues = (values: string[]) => {
		const clearedValues = values.map((item, index) => ({ id: index, value: item }))
		setInputValues(clearedValues)
	}

	const convertDateTimeToArrayValues = (dateTime: Date) => {
		let formattedValues: string[] = []
		switch (pickerType) {
			case 'date': {
				formattedValues = getFullDate(dateTime)
				break
			}
			case 'time': {
				formattedValues = getFullTime(dateTime)
				break
			}
		} 
		return formattedValues
	}

	const onPickerConfirmHandler = (dateTime: Date) => {
		const formattedValues: string[] = convertDateTimeToArrayValues(dateTime)
		populateInputValues(formattedValues)

		onDateSelect?.(dateTime)
		setIsValid(true)
		setDatePickerVisibility(false)
	}

	const onPickerCancelHandler = () => {
		setDatePickerVisibility(false)
	}

	const getFullDate = (date: Date) => {
		return [
			date.getDate().toString(),
			(date.getMonth() + 1).toString(),
			date.getFullYear().toString()
		]
	} 

	const getFullTime = (date: Date) => {
		return [
			date.getHours().toString(),
			date.getMinutes().toString()
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
				{
					inputValues && inputValues.map((item) => (
						<InputInfoSection key={item.id}>
							<InputText>
								{item.value} 
							</InputText>
						</InputInfoSection>
					))
				}
			</InputContainer>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode={pickerType}
				date={getNewDate(initialValue)}
				textColor={'black'}
				onConfirm={onPickerConfirmHandler}
				onCancel={onPickerCancelHandler}
			/>
		</>
	)
}

export { DataVisualizerInput }