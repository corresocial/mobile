import React, { useEffect, useState } from 'react'
import { ListRenderItem } from 'react-native'

import { useUtils } from '@newutils/useUtils'
import { addDays, addMonths, addWeeks, subDays, subMonths, subWeeks, startOfWeek, endOfWeek, getWeekOfMonth } from 'date-fns'

import { CultureEntity } from '@domain/post/entity/types'
import { formatDate } from '@domain/shared/utils/datetime'

import { useLocationContext } from '@contexts/LocationContext'

import { Direction, Visualizations } from './types'
import { navigateToPostView } from '@routes/auxMethods'
import { EventsCalendarScreenProps } from '@routes/Stack/HomeStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { formatHour, getNewDate } from '@utils-ui/common/date/dateFormat'

import { BottomNavigator, ColapsedEventGroup, EventsContainer, EventsFlatList, NoPostNotifierContainer } from './styles'
import { theme } from '@common/theme'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ContextHeader } from '@newComponents/ContextHeader'
import { EmptyPostsNotifier } from '@newComponents/EmptyPostsNotifier'
import { EventCard } from '@newComponents/EventCard'
import { InfoDivider } from '@newComponents/InfoDivider'
import { PaginatorHeader } from '@newComponents/PaginatorHeader'
import { ScreenContainer } from '@newComponents/ScreenContainer'
import { SelectButton } from '@newComponents/SelectButton'

const { getWeekdayName, getMonthName } = useUtils()

function EventsCalendar({ navigation }: EventsCalendarScreenProps) {
	const { locationDataContext } = useLocationContext()

	const [events, setEvents] = useState<any[]>()
	const [visualization, setVisualization] = useState<Visualizations>('week')
	const [currentDate, setCurrentDate] = useState<Date>(new Date())

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		const allPosts = [...locationDataContext.feedPosts.nearby, ...locationDataContext.feedPosts.city, ...locationDataContext.feedPosts.country]
		const fetchedEvents = allPosts.filter((post) => (post && post.macroCategory === 'event'))
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

	const getEventsByWeekCustomized = (date: Date) => {
		const startInMs = new Date(startOfWeek(date)).getTime()
		const endInMs = new Date(endOfWeek(date)).getTime()

		const eventsByWeek = (events || []).filter((event: CultureEntity) => {
			const eventDate = getNewDate(event.startDate).getTime()
			return (eventDate > startInMs && eventDate < endInMs)
		})

		return eventsByWeek
	}

	const renderPostsByWeek = (date: Date) => {
		const eventsWeek = getEventsByWeekCustomized(date).splice(0, 4)
		return eventsWeek.map((event) => {
			return (
				<EventCard
					post={event}
					colapsed
					onPress={() => navigateToPostView(event, navigation, 'Home')}
				/>
			)
		})
	}

	const renderEventCard = ({ item, index }: FlatListItem<any>) => { // CURRENT Type
		if (visualization === 'month' && item.postId) return
		if (!item.postId) {
			if (visualization === 'month') {
				return (
					<>
						<InfoDivider
							title={getDividerTitle(item.date)}
							subTitle={`${item.numberOfEvents} eventos`}
							icon={'calendarEveryday'}
							buttonTitle={'ver semana'}
							onPress={item.buttonAction ? item.buttonAction : undefined}
						/>
						<VerticalSpacing />
						<ColapsedEventGroup >
							{renderPostsByWeek(item.date)}
						</ColapsedEventGroup >
					</>
				)
			}

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

		return (
			<EventCard
				post={item}
				onPress={() => navigateToPostView(item, navigation, 'Home')}
			/>
		)
	}

	return (
		<ScreenContainer
			topSafeAreaColor={theme.colors.blue[1]}
			tone={'blue'}
			enableSectionPadding
			firstSection={(
				<ContextHeader
					title={'Calendário de eventos'}
					icon={'calendarEveryday'}
					rightLabel={`${currentDate.getFullYear()}`}
					onBack={() => navigation.goBack()}
				/>
			)}
			secondSection={(
				<PaginatorHeader
					title={getVisualizationLabel()}
					subTitle={getPaginatorSubtitle()}
					highlitedWords={[`${getMonthName(currentDate.getMonth())} `, `${currentDate.getDate()} `]}
					infoContainerWidth={visualization === 'day' ? '60%' : visualization === 'week' ? '50%' : '30%'}
					onNext={() => paginatorHandler('next')}
					onPrev={() => paginatorHandler('prev')}
					previousItem={getPaginatorItem('prev')}
					nextItem={getPaginatorItem('next')}
				/>
			)}
			thirdSecton={(
				<EventsContainer>
					<EventsFlatList
						data={getFilteredEvents()}
						renderItem={renderEventCard as ListRenderItem<unknown>}
						ListEmptyComponent={(
							<NoPostNotifierContainer>
								<EmptyPostsNotifier text={'Parece que não tem nenhum evento por aqui'} />
							</NoPostNotifierContainer>
						)}
						contentContainerStyle={({ height: '90%' })}
						showsVerticalScrollIndicator={false}
						ListHeaderComponent={<VerticalSpacing />}
						ItemSeparatorComponent={(item) => (visualization !== 'month' || item.leadingItem.buttonAction) && <VerticalSpacing />}
						ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
					/>
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
				</EventsContainer>
			)}
		/>
	)
}

export { EventsCalendar }
