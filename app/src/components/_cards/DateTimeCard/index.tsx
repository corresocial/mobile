import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { DateTimeContainer, OpeningAndClosingTime, WeekDaysFrequency } from './styles'
import DescriptionIcon from '../../../assets/icons/description.svg'

import { formatDate, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

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
		switch (weekDaysfrequency) {
			case 'today': return '●  só hoje'
			case 'everyday': return '●  todos os dias'
			case 'businessDay': return '●  seg à sex'
			case 'someday': return `●  ${daysOfWeek?.toString().replace(',', ', ')}`
			default: return '●  não disponível'
		}
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
			`●  das ${formatDate(openingTime)} as ${formatDate(closingTime)} `,
			[formatDate(openingTime), formatDate(closingTime)]
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
