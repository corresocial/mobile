import React from 'react'

import EventsCalendarIcon from '@assets/icons/calendar.svg'

import { CustomModal } from '../CustomModal'

interface EventCalendarPresentationModalProps {
	visibility: boolean
	onPressButton: () => void
	closeModal: () => void
}

function EventCalendarPresentationModal({
	visibility,
	onPressButton,
	closeModal
}: EventCalendarPresentationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			closeModal={closeModal}
			title={'Calendário de eventos'}
			firstParagraph={{ highlightedWords: ['Londrina', 'novo', 'calendário'], text: 'Os eventos da cidade de Londrina já estão disponíveis em nosso novo calendário. Vem conferir a programação da cidade!' }}
			TitleIcon={EventsCalendarIcon}
			titleHighlightedWords={['Calendário', 'de', 'eventos']}
			affirmativeButton={{
				label: 'ver calendário',
				onPress: onPressButton,
				// onPress: () => {
				// 	setShowEventsCalendarModal(false)
				// 	navigation.navigate('EventsCalendar')
				// },
				CustomIcon: null!
			}}
		/>
	)
}

export { EventCalendarPresentationModal }
