import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { DateTimeContainer, OpeningAndClosingTime, InfoRow } from './styles'
import ClockIcon from '../../../assets/icons/clock.svg'

import { formatDate, formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DaysOfWeek, EventRepeatType, WeekdaysFrequency } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface DateTimeCardProps {
	title: string
	weekDaysfrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	openingTime: Date
	closingTime: Date
	startDate?: Date
	endDate?: Date
	textFontSize?: number
	repetition?: EventRepeatType
}

function DateTimeCard({
	title,
	weekDaysfrequency,
	daysOfWeek = [],
	openingTime,
	closingTime,
	startDate,
	endDate,
	textFontSize = 12,
	repetition
}: DateTimeCardProps) {
	const getRelativeWeekDaysfrequency = () => {
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

	const renderStartDate = () => {
		return showMessageWithHighlight(`●  começa dia ${formatDate(startDate as any)}`, [formatDate(startDate as any)])
	}

	const renderEndDate = () => {
		return showMessageWithHighlight(`●  termina dia ${formatDate(endDate as any)}`, [formatDate(endDate as any)])
	}

	const renderOpeningAndClosingTime = () => {
		return showMessageWithHighlight(
			`●  das ${formatHour(openingTime)} as ${formatHour(closingTime)} `,
			[formatHour(openingTime), formatHour(closingTime)]
		)
	}

	const renderInvalidDateTimeWeekMessage = () => {
		return showMessageWithHighlight(
			'●  dias não definidos',
			['não', 'definidos']
		)
	}

	const renderRepetition = () => {
		switch (repetition) {
			case 'unrepeatable': return showMessageWithHighlight('●  não se repete', ['repete'])
			case 'everyDay': return showMessageWithHighlight('●  repete todos os dias', ['todos', 'os', 'dias'])
			case 'weekly': return showMessageWithHighlight('●  repete semanalmente', ['semanalmente'])
			case 'biweekly': return showMessageWithHighlight('●  repete a cada 15 dias', ['15', 'dias'])
			case 'monthly': return showMessageWithHighlight('●  repete mensalmnte', ['mensalmnte'])
			default: return false
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title}
				SvgIcon={ClockIcon}
				dimensions={35}
			/>
			<DateTimeContainer>
				{
					!startDate && !endDate && !daysOfWeek?.length
						? (
							<OpeningAndClosingTime style={{ fontSize: RFValue(textFontSize) }}>
								{renderInvalidDateTimeWeekMessage()}
							</OpeningAndClosingTime>
						)
						: startDate || endDate
							? (
								<>
									< InfoRow style={{ fontSize: RFValue(textFontSize) }}>
										{renderStartDate()}
									</InfoRow>
									< InfoRow style={{ fontSize: RFValue(textFontSize) }}>
										{renderEndDate()}
									</InfoRow>
								</>
							)
							: (
								< InfoRow style={{ fontSize: RFValue(textFontSize) }}>
									{renderWeekDayFrequency()}
								</InfoRow>
							)
				}
				<OpeningAndClosingTime style={{ fontSize: RFValue(textFontSize) }}>
					{renderOpeningAndClosingTime()}
				</OpeningAndClosingTime>
				{
					repetition
					&& (
						<OpeningAndClosingTime style={{ fontSize: RFValue(textFontSize) }}>
							{renderRepetition()}
						</OpeningAndClosingTime>
					)
				}
			</DateTimeContainer>
		</DefaultCardContainer >
	)
}

export { DateTimeCard }
