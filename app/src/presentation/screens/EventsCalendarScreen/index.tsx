import React, { useEffect, useState } from 'react'
import { ListRenderItem } from 'react-native'

import { useUtils } from '@newutils/useUtils'

import { CultureEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { usePostRepository } from '@data/post/usePostRepository'

import { Visualizations } from './types'
import { EventsCalendarScreenProps } from '@routes/Stack/CultureStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { formatHour, getNewDate } from '@utils-ui/common/date/dateFormat'

import { BottomNavigator, EventsContainer, EventsFlatList, FlatListBottomPadding } from './styles'
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

function EventsCalendarScreen({ route, navigation }: EventsCalendarScreenProps) {
	const [events, setEvents] = useState<any[]>()
	const [visualization, setVisualization] = useState<Visualizations>('day')
	const [weekDaySelected, setWeekDaySelected] = useState<number>(new Date().getDay())
	const [daySelected, setDaySelected] = useState<number>(new Date().getDate())
	const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth())
	const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		const fetchedEvents = await getEventPosts(usePostRepository, 'event', 10, null, true)
		setEvents(fetchedEvents)
	}

	const getFilteredEvents = (): any[] => {
		const currentDate = new Date(daySelected, monthSelected, yearSelected)

		switch (visualization) {
			case 'day': return separateEventsByHour(getEventsByDay())
			case 'month': return getEventsByDay()
			case 'week': return getEventsByDay()
		}
	}

	const getEventsByDay = () => {
		const currentDate = new Date(new Date().setDate(20))
		const auxDate = currentDate
		const startInMs = new Date(auxDate.setHours(0, 0, 0, 0)).getTime()
		const endInMs = new Date(auxDate.setHours(23, 59, 59, 999)).getTime()

		const eventsByDay = (events || []).filter((event: CultureEntity) => {
			const eventDate = getNewDate(event.startDate).getTime()
			return (eventDate > startInMs && eventDate < endInMs)
		})

		return eventsByDay
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

	const getNumberOfPostsByHour = (dayEvents: CultureEntity[], hour: number) => {
		return dayEvents?.filter((event: CultureEntity) => {
			const date = getNewDate(event.startDate)
			const eventHour = date.getHours()
			return eventHour === hour
		}).length
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
			case 'week': return 'Semana'
			case 'month': return 'Mês'
		}
	}

	const renderEventCard = ({ item, index }: FlatListItem<any>) => { // CURRENT Type
		if (!item.postId) {
			return <InfoDivider title={getDividerTitle(item.date)} subTitle={`${item.numberOfEvents} eventos`} />
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
					subTitle={`${getMonthName(monthSelected)} ${daySelected} - ${getWeekdayName(weekDaySelected)}`}
					highlitedWords={[`${getMonthName(monthSelected)}`, `${daySelected}`]}
					onNext={() => console.log('pressed next')}
					onPrev={() => console.log('pressed prev')}
					value={daySelected}
				/>
			)}
			thirdSecton={(
				<>
					<EventsContainer>
						<EventsFlatList
							data={getFilteredEvents()}
							renderItem={renderEventCard as ListRenderItem<unknown>}
							ItemSeparatorComponent={() => <VerticalSpacing />}
							ListFooterComponent={<FlatListBottomPadding />}
						/>
					</EventsContainer>
					<BottomNavigator>
						<SelectButton
							manualSelection
							selected={visualization === 'day'}
							selectionColor={theme.colors.blue[3]}
							relativeWidth={30}
							icon={'calendarEveryday'}
							text={'dia'}
							onPress={() => setVisualization('day')}
						/>
						<SelectButton
							manualSelection
							selected={visualization === 'week'}
							selectionColor={theme.colors.blue[3]}
							relativeWidth={30}
							icon={'calendarEveryday'}
							text={'semana'}
							onPress={() => setVisualization('week')}
						/>
						<SelectButton
							manualSelection
							selected={visualization === 'month'}
							selectionColor={theme.colors.blue[3]}
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
