import React, { useEffect, useState } from 'react'
import { ListRenderItem } from 'react-native'

import { useUtils } from '@newutils/useUtils'
import { addDays, addMonths, addWeeks, subDays, subMonths, subWeeks, startOfWeek, endOfWeek, getWeekOfMonth } from 'date-fns'

import { CultureEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { formatDate } from '@domain/shared/utils/datetime'

import { usePostRepository } from '@data/post/usePostRepository'

import { Direction, Visualizations } from './types'
import { EventsCalendarScreenProps } from '@routes/Stack/CultureStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { formatHour, getNewDate } from '@utils-ui/common/date/dateFormat'

import { BottomNavigator, EventsContainer, EventsFlatList } from './styles'
import { theme } from '@common/theme'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ContextHeader } from '@newComponents/ContextHeader'
import { EventCard } from '@newComponents/EventCard'
import { InfoDivider } from '@newComponents/InfoDivider'
import { PaginatorHeader } from '@newComponents/PaginatorHeader'
import { ScreenContainer } from '@newComponents/ScreenContainer'
import { SelectButton } from '@newComponents/SelectButton'

const { getEventPosts } = usePostDomain()
const { getWeekdayName, getMonthName } = useUtils()

function EventsCalendarScreen({ navigation }: EventsCalendarScreenProps) {
	const [events, setEvents] = useState<any[]>()
	const [visualization, setVisualization] = useState<Visualizations>('month')
	const [currentDate, setCurrentDate] = useState<Date>(new Date())

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		const fetchedEvents = await getEventPosts(usePostRepository, 'event', 10, null, true)
		setEvents(fetchedEvents)
	}

	const getFilteredEvents = (): any[] => {
		switch (visualization) {
			case 'day': return separateEventsByHour(getEventsByDay())
			case 'week': return separateEventsByDay(getEventsByWeek())
			case 'month': return separateEventsByWeek(getEventsByMonth())
		}
	}

	const getEventsByDay = () => {
		const startInMs = new Date(currentDate.setHours(0, 0, 0, 0)).getTime()
		const endInMs = new Date(currentDate.setHours(23, 59, 59, 999)).getTime()

		const eventsByDay = (events || []).filter((event: CultureEntity) => {
			const eventDate = getNewDate(event.startDate).getTime()
			return (eventDate > startInMs && eventDate < endInMs)
		})

		return eventsByDay
	}

	const getEventsByWeek = () => {
		const startInMs = new Date(startOfWeek(currentDate)).getTime()
		const endInMs = new Date(endOfWeek(currentDate)).getTime()

		const eventsByWeek = (events || []).filter((event: CultureEntity) => {
			const eventDate = getNewDate(event.startDate).getTime()
			return (eventDate > startInMs && eventDate < endInMs)
		})

		return eventsByWeek
	}

	const getEventsByMonth = () => {
		const eventsByMonth = (events || []).filter((event: CultureEntity) => {
			const eventDate = getNewDate(event.startDate)
			return (eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear())
		})

		return eventsByMonth
	}

	const separateEventsByHour = (dayEvents: CultureEntity[]) => {
		const groupedEvents = [] as any
		let auxHour = 0

		dayEvents?.reverse().forEach((event) => {
			const date = getNewDate(event.startDate)
			const eventHour = date.getHours()

			if (eventHour > auxHour) {
				groupedEvents.push({ date: new Date(date.setHours(eventHour)), numberOfEvents: getNumberOfPostsByHour(dayEvents, eventHour) })
				groupedEvents.push(event)
				auxHour = eventHour
			} else {
				groupedEvents.push(event)
			}
		})

		return groupedEvents
	}

	const separateEventsByDay = (weekEvents: CultureEntity[]) => {
		const groupedEvents = [] as any
		let auxDay = 0

		weekEvents?.reverse().forEach((event) => {
			const date = getNewDate(event.startDate)
			const eventDay = date.getDate()

			if (eventDay > auxDay) {
				groupedEvents.push({
					date: new Date(date.setHours(eventDay)),
					numberOfEvents: getNumberOfPostsByDay(weekEvents, eventDay),
					buttonAction: () => infoDividerHandler('day', date)
				})
				groupedEvents.push(event)
				auxDay = eventDay
			} else {
				groupedEvents.push(event)
			}
		})

		return groupedEvents
	}

	const separateEventsByWeek = (monthEvents?: CultureEntity[]) => {
		if (!monthEvents) return []
		const groupedEvents = [] as any
		let auxWeek = 0

		monthEvents?.reverse().forEach((event) => {
			const date = getNewDate(event.startDate)
			const eventWeek = getWeekOfMonth(date)

			if (eventWeek > auxWeek) {
				groupedEvents.push({
					date: date,
					numberOfEvents: getNumberOfPostsByWeek(monthEvents, eventWeek),
					buttonAction: () => infoDividerHandler('week', date)
				})
				groupedEvents.push(event)
				auxWeek = eventWeek
			} else {
				groupedEvents.push(event)
			}
		})

		return groupedEvents
	}

	const getNumberOfPostsByHour = (dayEvents: CultureEntity[], hour: number) => {
		return dayEvents?.filter((event: CultureEntity) => {
			const date = getNewDate(event.startDate)
			const eventHour = date.getHours()
			return eventHour === hour
		}).length
	}

	const getNumberOfPostsByDay = (weekEvents: CultureEntity[], day: number) => {
		return weekEvents?.filter((event: CultureEntity) => {
			const date = getNewDate(event.startDate)
			const eventDay = date.getDate()
			return eventDay === day
		}).length
	}

	const getNumberOfPostsByWeek = (monthEvents: CultureEntity[], week: number) => {
		return monthEvents?.filter((event: CultureEntity) => {
			const date = getNewDate(event.startDate)
			const eventWeek = getWeekOfMonth(date)
			return eventWeek === week
		}).length
	}

	const paginatorHandler = (direction: Direction) => {
		let newCurrentDate = currentDate

		switch (visualization) {
			case 'day': {
				newCurrentDate = direction === 'next'
					? addDays(currentDate, 1)
					: subDays(currentDate, 1)
				break
			}
			case 'week': {
				newCurrentDate = direction === 'next'
					? addWeeks(currentDate, 1)
					: subWeeks(currentDate, 1)
				break
			}
			case 'month': {
				newCurrentDate = direction === 'next'
					? addMonths(currentDate, 1)
					: subMonths(currentDate, 1)
				break
			}
		}

		setCurrentDate(newCurrentDate)
	}

	const getVisualizationLabel = (): string => {
		switch (visualization) {
			case 'day': return 'Dia'
			case 'month': return 'Mês'
			case 'week': return 'Semana'
		}
	}

	const getDividerTitle = (date: Date) => {
		switch (visualization) {
			case 'day': return `${formatHour(new Date(date.setMinutes(0)))}h`
			case 'week': return `${getWeekdayName(date.getDay())} ${formatDate(new Date(date))}`
			case 'month': return `Semana ${startOfWeek(date).getDate()} - ${endOfWeek(date).getDate()}`
		}
	}

	const getPaginatorSubtitle = () => {
		switch (visualization) {
			case 'day': return `${getMonthName(currentDate.getMonth())} ${currentDate.getDate()} - ${getWeekdayName(currentDate.getDay())}`
			case 'week': return `${getMonthName(currentDate.getMonth())} dia ${startOfWeek(currentDate).getDate()} - ${endOfWeek(currentDate).getDate()}`
			case 'month': return `${getMonthName(currentDate.getMonth())}`
		}
	}

	const getPaginatorItem = (direction: Direction) => {
		switch (visualization) {
			case 'day': return direction === 'next' ? `${addDays(currentDate, 1).getDate()} ` : `${subDays(currentDate, 1).getDate()}`
			case 'week': return direction === 'next' ? `${startOfWeek(addWeeks(currentDate, 1)).getDate()} - ${endOfWeek(addWeeks(currentDate, 1)).getDate()} ` : `${startOfWeek(subWeeks(currentDate, 1)).getDate()} - ${endOfWeek(subWeeks(currentDate, 1)).getDate()}`
			case 'month': return direction === 'next' ? `${getMonthName(addMonths(currentDate, 1).getMonth())}` : `${getMonthName(subMonths(currentDate, 1).getMonth())}`
		}
	}

	const infoDividerHandler = (calendarVisualization: Visualizations, date: Date) => {
		setVisualization(calendarVisualization)
		setCurrentDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
	}

	const renderEventCard = ({ item }: FlatListItem<any>) => { // CURRENT Type
		if (!item.postId) {
			return (
				<InfoDivider
					title={getDividerTitle(item.date)}
					subTitle={`${item.numberOfEvents} eventos`}
					icon={'calendarEveryday'}
					buttonTitle={visualization === 'week' ? 'ver dia' : 'ver semana'}
					onPress={item.buttonAction ? item.buttonAction : undefined}
				/>
			)
		}
		return <EventCard post={item} />
	}

	return (
		<ScreenContainer
			topSafeAreaColor={theme.colors.blue[1]}
			tone={'blue'}
			firstSection={(
				<ContextHeader
					title={'Calendário de eventos'}
					icon={'calendarEveryday'}
					onBack={() => navigation.goBack()}
				/>
			)}
			secondSection={(
				<PaginatorHeader
					title={getVisualizationLabel()}
					subTitle={getPaginatorSubtitle()}
					highlitedWords={[`${getMonthName(currentDate.getMonth())} `, `${currentDate.getDate()} `]}
					onNext={() => paginatorHandler('next')}
					onPrev={() => paginatorHandler('prev')}
					previousItem={getPaginatorItem('prev')}
					nextItem={getPaginatorItem('next')}
				/>
			)}
			thirdSecton={(
				<>
					<EventsContainer>
						<EventsFlatList
							data={getFilteredEvents()}
							renderItem={renderEventCard as ListRenderItem<unknown>}
							showsVerticalScrollIndicator={false}
							ListHeaderComponent={<VerticalSpacing />}
							ItemSeparatorComponent={() => <VerticalSpacing />}
							ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
						/>
					</EventsContainer>
					<BottomNavigator>
						<SelectButton
							manualSelection
							selected={visualization === 'day'}
							selectionColor={theme.colors.blue[2]}
							relativeWidth={30}
							icon={'calendarEveryday'}
							text={'dia'}
							onPress={() => setVisualization('day')}
						/>
						<SelectButton
							manualSelection
							selected={visualization === 'week'}
							selectionColor={theme.colors.blue[2]}
							relativeWidth={30}
							icon={'calendarEveryday'}
							text={'semana'}
							onPress={() => setVisualization('week')}
						/>
						<SelectButton
							manualSelection
							selected={visualization === 'month'}
							selectionColor={theme.colors.blue[2]}
							relativeWidth={30}
							icon={'calendarEveryday'}
							text={'mês'}
							onPress={() => setVisualization('month')}
						/>
					</BottomNavigator>
				</>
			)}
		/>
	)
}

export { EventsCalendarScreen }
