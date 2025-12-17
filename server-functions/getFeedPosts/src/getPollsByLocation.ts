import { Id, PollEntity } from "../domain/entities/poll/types"
import { CollectionRef, SearchParams } from "../domain/entities/request"

async function getNearbyPolls(collectionRef: CollectionRef, searchParams: SearchParams, userId: Id) {
    const queryNearby = collectionRef
        .where('completed', '==', false)
        .where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
        .orderBy('createdAt', 'desc')

    return queryNearby.get()
        .then((snapshotNearby) => {
            const polls: PollEntity[] = []
            const nearPollIds = [] as Id[]

            snapshotNearby.forEach((doc) => {
                const docData: PollEntity = doc.data() as PollEntity
                if (!(docData.idUsersResponded || []).includes(userId)) {
                    polls.push({ ...docData, pollId: doc.id })
                    nearPollIds.push(doc.id)
                    // console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().pollType}`)
                }
            })

            return { nearbyPolls: polls, nearPollIds }
        })
        .catch((error) => {
            console.error('Error fetching nearby polls:', error)
            return { nearbyPolls: [], nearPollIds: [] }
        })
}

async function getCityPolls(collectionRef: CollectionRef, searchParams: SearchParams, userId: Id, nearPollIds = [] as Id[]) {
    const queryCity = collectionRef
        .where('completed', '==', false)
        .where('location.city', '==', searchParams.city)
        .where('range', '==', 'city')
        .orderBy('createdAt', 'desc')

    return queryCity.get()
        .then((snapshotCity) => {
            const polls: PollEntity[] = []
            const cityPollIds = [] as Id[]

            snapshotCity.forEach((doc) => {
                const docData: PollEntity = doc.data() as PollEntity
                if (!nearPollIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) {
                    polls.push({ ...docData, pollId: doc.id })
                    cityPollIds.push(doc.id)
                    // console.log(`City: ${doc.data().title} - ${doc.data().range}`)
                }
            })

            return { cityPolls: polls, cityPollIds }
        })
        .catch((error) => {
            console.error('Error fetching city polls:', error)
            return { cityPolls: [], cityPollIds: [] }
        })
}

async function getCountryPolls(
    collectionRef: CollectionRef,
    searchParams: SearchParams,
    userId: Id,
    nearPollIds = [] as Id[],
    cityPollIds = [] as Id[]
) {
    const countryQuery = collectionRef
        .where('completed', '==', false)
        .where('location.country', '==', searchParams.country)
        .where('range', '==', 'country')
        .orderBy('createdAt', 'desc')

    return countryQuery.get()
        .then((snapshotCountry) => {
            const posts: PollEntity[] = []

            snapshotCountry.forEach((doc) => {
                const docData: PollEntity = doc.data() as PollEntity
                if (!nearPollIds.includes(doc.id) && !cityPollIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) { // TODO Não precisa dos 2 arrays, só ignorar cidade na query
                    posts.push({ ...docData, pollId: doc.id })
                    // console.log(`Country: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
                }
            })
            return posts
        })
        .catch((error) => {
            console.error('Error fetching city posts:', error)
            return []
        })
}

export { getNearbyPolls, getCityPolls, getCountryPolls }