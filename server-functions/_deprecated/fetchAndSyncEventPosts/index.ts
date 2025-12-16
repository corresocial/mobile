require('dotenv').config();

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { getEventCardElements, getEventDetails, getEventLinks } from './src/methods/extractDataFromSite'
import { structureEventPostsForApp } from './src/methods/structureExternalEventsData'
import { filterInvalidEvents, filterValidEvents } from './src/methods/eventFilters'
import { getRegisteredExternalEvents, saveEvents, updateRegisteredEvents } from './src/methods/postRepository'
import { generateReportTable } from './src/methods/generateReport'
import { getDateRange } from './src/methods/utils'
import { ExternalEvent } from './src/types/externalTypes'
import { sendEmail } from './src/methods/emailService'

admin.initializeApp()

// CURRENT Remove limits
export const maxOfPages = 100 // 100
export const limitPerPage = 25 // 25 

exports.fetchAndSyncEventPosts = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response | any) => {
	try {
		// Extração dos dados //
		const { startDate: startSearchDate, endDate: endSearchDate } = getDateRange()

		const externalEventDetails: ExternalEvent[] = []
		for (let sitePage = 1; sitePage <= maxOfPages; sitePage++) {
			console.log('------------------')
			console.log(`Página: ${sitePage}`)
			console.log('------------------')
			const symplaSiteUrl = `https://www.sympla.com.br/eventos/londrina-pr?page=${sitePage}&ordem=date&d=${startSearchDate}%2C${endSearchDate}`

			const eventPageData = await getEventCardElements(symplaSiteUrl)

			console.log('eventPageData', !!eventPageData)

			if (eventPageData) {
				if (!eventPageData.eventElements || (eventPageData.eventElements && !eventPageData.eventElements.length)) {
					console.log('Página sem eventos')
					break
				}

				const eventLinks = getEventLinks(eventPageData.pageRef, eventPageData.eventElements)

				const { detalhedEvents, eventLimitReached } = await getEventDetails(eventLinks, new Date(endSearchDate))

				if (detalhedEvents && detalhedEvents.length) {
					externalEventDetails.push(...detalhedEvents)
				}

				if (eventLimitReached || (!detalhedEvents || detalhedEvents && !detalhedEvents.length)) break
			}

		}

		console.log('Número de eventos encontrados:', externalEventDetails.length)

		// Tratamento dos dados //
		const structuredEventPosts = structureEventPostsForApp(externalEventDetails)

		// Filtragem //
		const registeredExternalEvents = await getRegisteredExternalEvents()
		const validEvents = filterValidEvents(structuredEventPosts, registeredExternalEvents)
		const invalidEvents = filterInvalidEvents(structuredEventPosts, registeredExternalEvents)

		// Persistência //
		const savedEvents = await saveEvents(validEvents)
		const removedEvents = await updateRegisteredEvents(invalidEvents, registeredExternalEvents)

		console.log('-----------------------------------')
		console.log(`Eventos adicionados - ${savedEvents.length}`)
		console.log(savedEvents.map((e) => e.externalPostId))
		console.log(`Eventos indisponíveis - ${removedEvents.length}`)
		console.log(removedEvents.map((e) => e.externalPostId))
		console.log('-----------------------------------')

		// Relatório
		const eventsReport = generateReportTable(savedEvents, removedEvents)
		if (!!(savedEvents && savedEvents.length) || !!(removedEvents && removedEvents.length)) {
			await sendEmail(process.env.REPORT_RECIPIENT_EMAIL!, eventsReport)
		}

		return res.status(200).send('Sucesso ao importar eventos')
	} catch (error) {
		console.log('Error:', error)
		return res.status(500).send(error)
	}
})