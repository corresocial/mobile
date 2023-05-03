import React from 'react'

import { DateTimeContainer } from './styles'
import ClockWhiteIcon from '../../../assets/icons/clock-white.svg'

import { formatDate, formatHour, showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DaysOfWeek, EventRepeatType, WeekdaysFrequency } from '../../../services/firebase/types'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface DateTimeCardProps {
	title?: string
	weekDaysfrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startTime: Date
	endTime: Date
	startDate?: Date
	endDate?: Date
	textFontSize?: number
	repetition?: EventRepeatType
}

function DateTimeCard({
	title,
	weekDaysfrequency,
	daysOfWeek = [],
	startTime,
	endTime,
	startDate,
	endDate,
	textFontSize = 14,
	repetition
}: DateTimeCardProps) {
	const getRelativeWeekDaysfrequency = () => {
		switch (weekDaysfrequency) {
			case 'today': return 'só hoje'
			case 'everyday': return 'todos os dias'
			case 'businessDay': return 'seg à sex'
			case 'someday': return `${listDaysOfWeek()}`
			default: return 'não disponível'
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
			case 'someday': return daysOfWeek || []
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
		return (
			<PostInfoRow
				text={showMessageWithHighlight(
					`começa dia ${formatDate(startDate as Date)}`,
					[formatDate(startDate as Date)]
				)}
				topic
			/>
		)
	}

	const renderEndDate = () => {
		return (
			<PostInfoRow
				text={showMessageWithHighlight(
					`termina dia ${formatDate(endDate as Date)}`,
					[formatDate(endDate as Date)]
				)}
				topic
			/>
		)
	}

	const renderOpeningAndClosingTime = () => {
		const formatedStartTime = formatHour(startTime)
		const formatedEndTime = formatHour(endTime)

		if ((formatedStartTime && !formatedEndTime) || (!formatedStartTime && formatedEndTime)) {
			return showMessageWithHighlight(
				`${formatedStartTime ? 'começa' : 'termina'} às ${formatedStartTime} `,
				[formatedStartTime || formatedEndTime]
			)
		}

		return showMessageWithHighlight(
			`das ${formatedStartTime} as ${formatedEndTime} `,
			[formatedStartTime, formatedEndTime]
		)
	}

	const renderInvalidDateTimeWeekMessage = () => {
		return showMessageWithHighlight(
			'dias e horários não definidos',
			['não', 'definidos']
		)
	}

	const renderRepetition = () => {
		switch (repetition) {
			case 'unrepeatable': return showMessageWithHighlight('não se repete', ['não', 'repete'])
			case 'everyDay': return showMessageWithHighlight('repete todos os dias', ['todos', 'os', 'dias'])
			case 'weekly': return showMessageWithHighlight('repete semanalmente', ['semanalmente'])
			case 'biweekly': return showMessageWithHighlight('repete a cada 15 dias', ['15', 'dias'])
			case 'monthly': return showMessageWithHighlight('repete mensalmnte', ['mensalmnte'])
			default: return ''
		}
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || 'dias e horários'}
				highlightedWords={['dias', 'horários']}
				SvgIcon={ClockWhiteIcon}
				dimensions={32}
			/>
			<DateTimeContainer>
				{
					daysOfWeek?.length
						? (
							<PostInfoRow
								text={renderWeekDayFrequency()}
								topic
							/>
						)
						: <></>
				}
				{
					(!startDate && !endDate && !daysOfWeek?.length) && (
						<PostInfoRow
							text={renderInvalidDateTimeWeekMessage()}
							topic
						/>
					)
				}
				{
					(startDate || endDate) && (
						<>
							{startDate && renderStartDate()}
							{endDate && renderEndDate()}
						</>
					)
				}
				{
					(startTime || endTime) && (
						<PostInfoRow
							text={renderOpeningAndClosingTime()}
							topic
						/>
					)
				}
				{
					repetition
					&& (
						<PostInfoRow
							text={renderRepetition()}
							topic
						/>
					)
				}
			</DateTimeContainer>
		</DefaultCardContainer >
	)
}

export { DateTimeCard }
