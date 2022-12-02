import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { DateTimeContainer, OpeningAndClosingTime, WeekDaysFrequency } from './styles'
import DescriptionIcon from '../../../assets/icons/description.svg'

import { formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DateTimeCardProps {
	title: string
	weekDaysfrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	openingTime: Date
	closingTime: Date
	textFontSize?: number
}

function DateTimeCard({
	title,
	weekDaysfrequency,
	daysOfWeek,
	openingTime,
	closingTime,
	textFontSize = 12
}: DateTimeCardProps) {
	const getRelativeWeekDaysfrequency = () => {
		console.log()
		switch (weekDaysfrequency) {
			case 'today': return '●  só hoje'
			case 'everyday': return '●  todos os dias'
			case 'businessDay': return '●  seg à sex'
			case 'someday': return `●  ${listDaysOfWeek()}`
			default: return '●  não disponível'
		}
	}

	const listDaysOfWeek = () => {
		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => daysOfWeek?.includes(weekDay))
		return ordenedDaysOfWeek?.toString().split(',').join(', ')
	}

	const getRelativeHighlight = () => {
		switch (weekDaysfrequency) {
			case 'today': return ['hoje']
			case 'everyday': return ['todos']
			case 'businessDay': return ['seg', 'sex']
			case 'someday': return daysOfWeek
			default: return ['disponível']
		}
	}

	const renderWeekDayFrequency = () => {
		return showMessageWithHighlight(
			getRelativeWeekDaysfrequency(),
			getRelativeHighlight()
		)
	}

	const renderOpeningAndClosingTime = () => {
		return showMessageWithHighlight(
			`●  das ${formatHour(openingTime)} as ${formatHour(closingTime)} `,
			[formatHour(openingTime), formatHour(closingTime)]
		)
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title}
				SvgIcon={DescriptionIcon}
				dimensions={35}
			/>
			<DateTimeContainer>
				<WeekDaysFrequency style={{ fontSize: RFValue(textFontSize) }}>
					{renderWeekDayFrequency()}
				</WeekDaysFrequency>
				<OpeningAndClosingTime style={{ fontSize: RFValue(textFontSize) }}>
					{renderOpeningAndClosingTime()}
				</OpeningAndClosingTime>
			</DateTimeContainer>
		</DefaultCardContainer>
	)
}

export { DateTimeCard }
