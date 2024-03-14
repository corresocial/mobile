import React, { useEffect, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

import {
	InputContainer,
	InputInfoSection,
	InputTextUnderLine,
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
	type InputValuesType = { id: number, value: string }

	const [isValid, setIsValid] = useState(!!initialValue)
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
	const [inputValues, setInputValues] = useState<InputValuesType[]>([])

	useEffect(() => {
		if (initialValue) {
			const newDate = getNewDate(initialValue)
			const formattedValues = convertDateTimeToArrayValues(newDate)
			populateInputValues(formattedValues)
			return
		}
		populateInputValues(fields)
	}, [])

	const inputPressHandler = () => {
		if (openPickerOnTouch) {
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
			date.getDate().toString().padStart(2, '0'),
			(date.getMonth() + 1).toString().padStart(2, '0'),
			date.getFullYear().toString()
		]
	}

	const getFullTime = (date: Date) => {
		return [
			date.getHours().toString().padStart(2, '0'),
			date.getMinutes().toString().padStart(2, '0')
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
							<InputText valid={isValid}>
								{item.value}
							</InputText>
							<InputTextUnderLine valid={isValid} />
						</InputInfoSection>
					))
				}
			</InputContainer>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode={pickerType}
				textColor={'black'}
				is24Hour={false}
				minuteInterval={10}
				onConfirm={onPickerConfirmHandler}
				onCancel={onPickerCancelHandler}
			/>
		</>
	)
}

export { DataVisualizerInput }
