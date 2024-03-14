import React from 'react'
import uuid from 'react-uuid'

import { DaysOfWeek, EventRepeatType, WeekdaysFrequency } from '@services/firebase/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { DateTimeContainer } from './styles'
import CalendarBusinessDay from '@assets/icons/calendarBusinessDay-white.svg'
import CalendarEveryday from '@assets/icons/calendarEveryday-white.svg'
import CalendarSomeday from '@assets/icons/calendarSomeday-white.svg'
import CalendarToday from '@assets/icons/calendarToday-white.svg'
import ClockWhiteIcon from '@assets/icons/clock-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
// import { DefaultCardContainer } from '../DefaultCardContainer'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

const { formatDate, formatHour } = UiUtils()

interface DateTimeCardProps {
	title?: string
	highlightedWords?: string[]
	weekDaysfrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startTime?: Date
	endTime?: Date
	startDate?: Date
	endDate?: Date
	repetition?: EventRepeatType
	onEdit?: () => void
}

function DateTimeCard({
	title,
	highlightedWords,
	weekDaysfrequency,
	daysOfWeek = [],
	startTime,
	endTime,
	startDate,
	endDate,
	repetition,
	onEdit
}: DateTimeCardProps) {
	const listDaysOfWeek = () => {
		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => daysOfWeek?.includes(weekDay))
		return ordenedDaysOfWeek?.toString().split(',').join(', ')
	}

	const getRelativeWeekDaysfrequency = () => {
		switch (weekDaysfrequency) {
			case 'today': return 'só hoje'
			case 'everyday': return 'todos os dias'
			case 'businessDay': return 'seg à sex'
			case 'someday': return `${listDaysOfWeek()}`
			default: return 'não disponível'
		}
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

	const getRelativeFrequencyIcon = () => {
		switch (weekDaysfrequency) {
			case 'today': return CalendarToday
			case 'everyday': return CalendarEveryday
			case 'businessDay': return CalendarBusinessDay
			case 'someday': return CalendarSomeday
			default: return CalendarToday
		}
	}

	const renderWeekDayFrequency = () => {
		if (onEdit && weekDaysfrequency === 'someday') {
			return showMessageWithHighlight(`alguns dias \n${getRelativeWeekDaysfrequency()}`, ['alguns'], `\n${getRelativeWeekDaysfrequency()}`.split(', '))
		}

		return showMessageWithHighlight(
			getRelativeWeekDaysfrequency(),
			getRelativeHighlight()
		)
	}

	const renderStartDate = () => {
		return (
			<PostInfoRow
				key={uuid()}
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
				key={uuid()}
				text={showMessageWithHighlight(
					`termina dia ${formatDate(endDate as Date)}`,
					[formatDate(endDate as Date)]
				)}
				topic
			/>
		)
	}

	const renderOpeningAndClosingTime = () => {
		const formatedStartTime = formatHour(startTime as Date)
		const formatedEndTime = formatHour(endTime as Date)

		if ((startTime && !endTime) || (!startTime && endTime)) {
			return showMessageWithHighlight(
				`${formatedStartTime ? 'começa' : 'termina'} às ${formatedStartTime || formatedEndTime}`,
				[formatedStartTime || formatedEndTime]
			)
		}

		return showMessageWithHighlight(
			`das ${formatedStartTime} as ${formatedEndTime} `,
			[formatedStartTime, formatedEndTime]
		)
	}

	const renderInvalidDateTimeWeekMessage = () => {
		if (onEdit) {
			return showMessageWithHighlight(
				'dias não definidos',
				['não', 'definidos']
			)
		}

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

	const getCardHeaderIcon = () => {
		if (!hasAnyValueValid()) {
			return PlusWhiteIcon
		}
	}

	const hasAnyValueValid = () => {
		return !(!startDate && !endDate && !daysOfWeek?.length && !startTime && !endTime)
	}

	return (
		<DefaultTouchableCardContainer
			pressionable={!!onEdit}
			onPress={onEdit}
		>
			<EditHeaderContainer onPress={onEdit} RightIcon={getCardHeaderIcon()}>
				<DefaultHeaderTitle
					title={title || 'dias e horários'}
					highlightedWords={highlightedWords || ['dias', 'horários']}
					SvgIcon={!onEdit ? ClockWhiteIcon : undefined}
					dimensions={28}
				/>
			</EditHeaderContainer>
			<DateTimeContainer editable={onEdit}>
				{
					daysOfWeek?.length
						? (
							<PostInfoRow
								key={uuid()}
								SvgIcon={onEdit ? getRelativeFrequencyIcon() : undefined}
								text={renderWeekDayFrequency()}
								topic={!onEdit}
							/>
						)
						: <></>
				}
				{
					!hasAnyValueValid() && !onEdit && (
						<PostInfoRow
							key={uuid()}
							text={renderInvalidDateTimeWeekMessage()}
							topic={!onEdit}
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
							key={uuid()}
							text={renderOpeningAndClosingTime()}
							topic
						/>
					)
				}
				{
					repetition
					&& (
						<PostInfoRow
							key={uuid()}
							text={renderRepetition()}
							topic
						/>
					)
				}
			</DateTimeContainer>
		</DefaultTouchableCardContainer >
	)
}

export { DateTimeCard }
