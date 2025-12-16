import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

admin.initializeApp({ credential: admin.credential.cert(require('./cred-dev.json')) })

import { PostCollectionRequired } from './domain/entities/post/common'
import { RequestBody } from './domain/entities/request'

import { getNearbyPosts, getCityPosts, getCountryPosts, filterLocation } from './src/getPostsByLocation'
import { getCityPolls, getCountryPolls, getNearbyPolls } from './src/getPollsByLocation'
import { getCityPetitions, getCountryPetitions, getNearbyPetitions } from './src/getPetitionsByLocation'

// async function getFeedPosts(data: any) {
exports.getFeedPosts = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response | any) => {
	const getNewDate = (date: any) => {
		type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }
		if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
			const { _seconds, seconds } = date as DateFirestore

			if (seconds) {
				return new Date(seconds * 1000)
			}
			return new Date(_seconds * 1000)
		}
		return new Date(date)
	}

	const sortByCreatedAt = (a: any, b: any) => {
		const createdAtA = getNewDate(a.createdAt)
		const createdAtB = getNewDate(b.createdAt)

		if (createdAtA < createdAtB) return 1
		if (createdAtA > createdAtB) return -1
		return 0
	}

	try {
		const collectionRef = admin.firestore().collection('posts')
		const pollCollectionRef = admin.firestore().collection('polls')
		const petitionCollectionRef = admin.firestore().collection('petitions')

		// const { searchParams, userId }: RequestBody = data
		const { searchParams, userId }: RequestBody = req.body

		const { nearbyPosts, nearPostIds } = await getNearbyPosts(collectionRef, searchParams)
		const { cityPosts, cityPostIds } = await getCityPosts(collectionRef, searchParams, nearPostIds)
		const countryPosts = await getCountryPosts(collectionRef, searchParams, nearPostIds, cityPostIds)

		console.log('searchParams.searchLeaderPosts')
		console.log(searchParams.searchLeaderPosts)

		const { nearbyPolls, nearPollIds } = searchParams.searchLeaderPosts
			? await getNearbyPolls(pollCollectionRef, searchParams, userId)
			: { nearbyPolls: [], nearPollIds: [] }

		const { cityPolls, cityPollIds } = searchParams.searchLeaderPosts
			? await getCityPolls(pollCollectionRef, searchParams, userId, nearPollIds)
			: { cityPolls: [], cityPollIds: [] }

		const countryPolls = searchParams.searchLeaderPosts
			? await getCountryPolls(pollCollectionRef, searchParams, userId, cityPollIds)
			: []

		const { nearbyPetitions, nearPetitionIds } = searchParams.searchLeaderPosts
			? await getNearbyPetitions(petitionCollectionRef, searchParams, userId)
			: { nearbyPetitions: [], nearPetitionIds: [] }

		const { cityPetitions, cityPetitionIds } = searchParams.searchLeaderPosts
			? await getCityPetitions(petitionCollectionRef, searchParams, userId, nearPetitionIds)
			: { cityPetitions: [], cityPetitionIds: [] }

		const countryPetitions = searchParams.searchLeaderPosts
			? await getCountryPetitions(petitionCollectionRef, searchParams, userId, cityPetitionIds)
			: []


		const postsWithLocationFilter = {
			nearby: filterLocation(nearbyPosts as PostCollectionRequired[], userId),
			city: filterLocation(cityPosts as PostCollectionRequired[], userId),
			country: filterLocation(countryPosts as PostCollectionRequired[], userId)
		}

		const completeFeed = {
			nearby: [...postsWithLocationFilter.nearby, ...nearbyPolls, ...nearbyPetitions].sort(sortByCreatedAt),
			city: [...postsWithLocationFilter.city, ...cityPolls, ...cityPetitions].sort(sortByCreatedAt),
			country: [...postsWithLocationFilter.country, ...countryPolls, ...countryPetitions].sort(sortByCreatedAt)
		}

		// return completeFeed
		return res.status(200).send(completeFeed)
	} catch (err) {
		console.log(err)
		return res.status(500).send({
			nearby: [],
			city: [],
			country: []
		})
	}
	// }
})


/* const main = async () => {
	const request: RequestBody = {
		searchParams: {
			searchLeaderPosts: true,
			city: "Londrina",
			country: "Brasil",
			geohashes: ["6gge7g", "6gge7u", "6ggekh", "6ggek5", "6ggek4", "[6gge7f]", "[6gge7d]", "6gge7e", "6gge7s"]
		},
		userId: 'gubzWyXdQFeC5xEaWlTtbaR64tT2'
	}

	const polls = await getFeedPosts(request)
	console.log('--------------------------------------')
	console.log('NEAR')
	polls?.nearby.map((poll: PollEntity | PostCollection | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
	console.log('CITY')
	polls?.city.map((poll: PollEntity | PostCollection | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
	console.log('COUNTRY')
	polls?.country.map((poll: PollEntity | PostCollection | any) => console.log('-', poll.postId ? 'post' : 'enquete', '-', poll.title || poll.description, '-', poll.range))
	console.log('--------------------------------------')
}

main() */