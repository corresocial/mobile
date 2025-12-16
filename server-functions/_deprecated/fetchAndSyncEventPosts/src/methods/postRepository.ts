import * as admin from 'firebase-admin'

import { EventPost } from "../types/eventPost"

async function getRegisteredExternalEvents() {
    const db = admin.firestore()
    const eventsRef = db.collection('posts')

    try {
        const eventsSnaphot = await eventsRef
            .where('externalPostId', '>', '0')
            .where('macroCategory', '==', 'event')
            .get()

        return eventsSnaphot.docs.map((doc) => ({ ...doc.data(), postId: doc.id })) as EventPost[]
    } catch (error) {
        console.log(error)
        throw new Error('Erro ao buscar eventos cadastrados')
    }
}

async function saveEvents(events: EventPost[]): Promise<EventPost[]> {
    let lastEventId = ''
    const savedEvents: EventPost[] = []

    try {
        const db = admin.firestore()
        const batch = db.batch()

        const eventsCollection = db.collection('posts')

        events.forEach((event) => {
            if (Object.keys(event).includes('cancelled')) delete event.cancelled
            if (Object.keys(event).includes('isClosed')) delete event.isClosed

            const docRef = eventsCollection.doc()
            batch.create(docRef, { ...event, createdAt: new Date(), source: 'sympla' })

            // console.log('Salvando evento com o id', event.externalPostId)
            lastEventId = event.externalPostId || docRef.id
            savedEvents.push({ ...event, postId: docRef.id })

            batch.update(docRef, { postId: docRef.id })
        })

        await batch.commit()
        return savedEvents
    } catch (error) {
        console.log(error)
        console.log('Erro ao salvar o evento: ', lastEventId)
        return []
    }
}

async function deleteRegisteredEvents(events: EventPost[], registeredExternalEvents: EventPost[]): Promise<EventPost[]> {
    let lastEventId = ''
    const removedEvents: EventPost[] = []

    try {
        const db = admin.firestore()
        const batch = db.batch()

        const eventsCollection = db.collection('posts')

        events.forEach((event) => {
            const eventId = getPostIdByExternalEventId(event, registeredExternalEvents)
            if (!eventId) return

            lastEventId = eventId
            removedEvents.push(event)

            const docRef = eventsCollection.doc(eventId)
            // console.log('Deletando evento com o id', event.externalPostId)
            batch.delete(docRef)
        })

        await batch.commit()

        return removedEvents
    } catch (error) {
        console.log(error)
        console.log('Erro ao deletar o evento: ', lastEventId)
        return []
    }
}

async function updateRegisteredEvents(events: EventPost[], registeredExternalEvents: EventPost[]): Promise<EventPost[]> {
    let lastEventId = ''
    const updatedEvents: EventPost[] = []

    try {
        const db = admin.firestore()
        const batch = db.batch()

        const eventsCollection = db.collection('posts')

        events.forEach((event) => {
            const eventId = getPostIdByExternalEventId(event, registeredExternalEvents)
            if (!eventId) return

            lastEventId = eventId
            updatedEvents.push(event)

            const docRef = eventsCollection.doc(eventId)
            // console.log('Deletando evento com o id', event.externalPostId)
            batch.update(docRef, { ...event, completed: true, source: 'sympla' })
        })

        await batch.commit()

        return updatedEvents
    } catch (error) {
        console.log(error)
        console.log('Erro ao atualizar o evento: ', lastEventId)
        throw error
    }
}


function getPostIdByExternalEventId(event: EventPost, registeredExternalEvents: EventPost[]) {
    const currentEvent = registeredExternalEvents.find((registeredEvent) => registeredEvent.externalPostId === event.externalPostId)
    return currentEvent && currentEvent?.postId ? currentEvent?.postId : null
}

export {
    getRegisteredExternalEvents,
    saveEvents,
    deleteRegisteredEvents,
    updateRegisteredEvents
}