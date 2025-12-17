import { Id, PetitionEntity } from "../domain/entities/petition/types"
import { CollectionRef, SearchParams } from "../domain/entities/request"

async function getNearbyPetitions(collectionRef: CollectionRef, searchParams: SearchParams, userId: Id) {
    const queryNearby = collectionRef
        .where('completed', '==', false)
        .where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
        .orderBy('createdAt', 'desc')

    return queryNearby.get()
        .then((snapshotNearby) => {
            const petitions: PetitionEntity[] = []
            const nearPetitionIds = [] as Id[]

            snapshotNearby.forEach((doc) => {
                const docData: PetitionEntity = doc.data() as PetitionEntity
                if (!(docData.idUsersResponded || []).includes(userId)) {
                    petitions.push({ ...docData, petitionId: doc.id })
                    nearPetitionIds.push(doc.id)
                    // console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().petitionType}`)
                }
            })

            return { nearbyPetitions: petitions, nearPetitionIds }
        })
        .catch((error) => {
            console.error('Error fetching nearby petitions:', error)
            return { nearbyPetitions: [], nearPetitionIds: [] }
        })
}

async function getCityPetitions(collectionRef: CollectionRef, searchParams: SearchParams, userId: Id, nearPetitionIds = [] as Id[]) {
    const queryCity = collectionRef
        .where('completed', '==', false)
        .where('location.city', '==', searchParams.city)
        .where('range', '==', 'city')
        .orderBy('createdAt', 'desc')

    return queryCity.get()
        .then((snapshotCity) => {
            const petitions: PetitionEntity[] = []
            const cityPetitionIds = [] as Id[]

            snapshotCity.forEach((doc) => {
                const docData: PetitionEntity = doc.data() as PetitionEntity
                if (!nearPetitionIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) {
                    petitions.push({ ...docData, petitionId: doc.id })
                    cityPetitionIds.push(doc.id)
                    // console.log(`City: ${doc.data().title} - ${doc.data().range}`)
                }
            })

            return { cityPetitions: petitions, cityPetitionIds }
        })
        .catch((error) => {
            console.error('Error fetching city petitions:', error)
            return { cityPetitions: [], cityPetitionIds: [] }
        })
}

async function getCountryPetitions(
    collectionRef: CollectionRef,
    searchParams: SearchParams,
    userId: Id,
    nearPetitionIds = [] as Id[],
    cityPetitionIds = [] as Id[]
) {
    const countryQuery = collectionRef
        .where('completed', '==', false)
        .where('location.country', '==', searchParams.country)
        .where('range', '==', 'country')
        .orderBy('createdAt', 'desc')

    return countryQuery.get()
        .then((snapshotCountry) => {
            const posts: PetitionEntity[] = []

            snapshotCountry.forEach((doc) => {
                const docData: PetitionEntity = doc.data() as PetitionEntity
                if (!nearPetitionIds.includes(doc.id) && !cityPetitionIds.includes(doc.id) && !(docData.idUsersResponded || []).includes(userId)) { // TODO Não precisa dos 2 arrays, só ignorar cidade na query
                    posts.push({ ...docData, petitionId: doc.id })
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

export { getNearbyPetitions, getCityPetitions, getCountryPetitions }