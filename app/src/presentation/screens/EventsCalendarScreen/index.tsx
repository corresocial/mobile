import React, { useEffect, useState } from 'react'

import { useUtils } from '@newutils/useUtils'

import { usePostDomain } from '@domain/post/usePostDomain'

import { getPostsByMacroCategory } from '@data/post/remoteStorage/getPostsByMacroCategory'
import { usePostRepository } from '@data/post/usePostRepository'

import { EventsCalendarScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { BottomNavigator, EventsContainer, EventsFlatList, FlatListBottomPadding } from './styles'
import { theme } from '@common/theme'

import { ContextHeader } from '@newComponents/ContextHeader'
import { EventCard } from '@newComponents/EventCard'
import { InfoDivider } from '@newComponents/InfoDivider'
import { PaginatorHeader } from '@newComponents/PaginatorHeader'
import { ScreenContainer } from '@newComponents/ScreenContainer'
import { SelectButton } from '@newComponents/SelectButton'

const mockedEvents = [
	{
		id: 0,
		description: 'eu sou um evento test',
		date: new Date().setHours(12),
		profilePictureUrl: 'hi'
	},
	{
		id: 1,
		description: 'eu não sou um evento :(',
		date: new Date().setHours(5),
		profilePictureUrl: 'hi'
	},
	{
		id: 2,
		description: 'eu sou um evento impostor',
		date: new Date().setHours(12),
		profilePictureUrl: 'hi'
	},
	{
		id: 3,
		description: 'eu não queria ser um evento',
		date: new Date().setHours(10),
		profilePictureUrl: 'hi'
	},
	{
		id: 4,
		description: 'eu sou um evento real de verdade',
		date: new Date().setHours(5),
		profilePictureUrl: 'hi'
	}
]

const { getEventPosts } = usePostDomain()
const { getWeekdayName, getMonthName } = useUtils()

function EventsCalendarScreen({ route, navigation }: EventsCalendarScreenProps) {
	const [events, setEvents] = useState<any[]>()
	const [visualization, setVisualization] = useState<'day' | 'month' | 'week'>('day')
	const [weekDaySelected, setWeekDaySelected] = useState<number>(new Date().getDay())
	const [daySelected, setDaySelected] = useState<number>(new Date().getDate())
	const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth())

	function Separator() {
		return (
			<InfoDivider title={'Eu sou um divider'} subTitle={'é verdade'}></InfoDivider>
		)
	}

	useEffect(() => {
		getPosts()
	}, [])

	useEffect(() => {
		console.log('fetched and replaced')
		console.log(events)
	}, [events])

	const getPosts = async () => {
		const fetchedEvents = await getEventPosts(usePostRepository, 'event', 1, null, true)
		setEvents(fetchedEvents)
	}

	// const separateEventsByHour = (): any => {
	// 	const groupedEvents = [] as any
	// 	events.forEach((event) => {
	// 		console.log(event)

	// 		const hour = new Date(event.date).getHours()

	// 		if (!groupedEvents[hour]) {
	// 			groupedEvents[hour] = []
	// 		}

	// 		groupedEvents[hour].push(event)
	// 	})

	// 	const result = Object.entries(groupedEvents).map(([hour, hourEvents]) => [parseInt(hour), hourEvents])

	// 	return result
	// }

	const getVisualizationLabel = (): string => {
		switch (visualization) {
			case 'day':
				return 'Dia'
			case 'month':
				return 'Mês'
			case 'week':
				return 'Semana'
		}
	}

	return (
		<>
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
					<EventsContainer>
						<EventsFlatList
							data={events}
							renderItem={({ item }) => <EventCard post={item as any} />}
							ItemSeparatorComponent={Separator}
							ListFooterComponent={<FlatListBottomPadding />}
						/>
					</EventsContainer>
				)}
			/>
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
	)
}

export { EventsCalendarScreen }
