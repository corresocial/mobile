import * as admin from 'firebase-admin'
import { onRequest, HttpsError } from 'firebase-functions/v2/https'
import { validateAuthToken, AuthError } from './validateAuthToken'

// Prevent "App already exists" errors during hot-reload or cold starts
if (!admin.apps.length) {
	admin.initializeApp()
}

import { PostCollectionRequired } from './domain/entities/post/common'
import { RequestBody } from './domain/entities/request'

import { getNearbyPosts, getCityPosts, getCountryPosts, filterLocation } from './src/getPostsByLocation'
import { getCityPolls, getCountryPolls, getNearbyPolls } from './src/getPollsByLocation'
import { getCityPetitions, getCountryPetitions, getNearbyPetitions } from './src/getPetitionsByLocation'

// Helper functions moved outside to keep the main logic clean
const getNewDate = (date: any) => {
	type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }
	if (date && (typeof date === 'object') && ('seconds' in date || '_seconds' in date)) {
		const { _seconds, seconds } = date as DateFirestore
		if (seconds) return new Date(seconds * 1000)
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

export const getFeedPosts = onRequest(async (request, response) => {
	// 1. SECURITY: Validate authentication token
	let userId: string;
	try {
		const auth = await validateAuthToken(request);
		userId = auth.uid;
		console.log(`Authenticated user: ${userId}`);
	} catch (error) {
		if (error instanceof AuthError) {
			response.status(401).json({
				error: error.message,
				code: error.code
			});
			return;
		}
		response.status(401).json({ error: 'Authentication failed' });
		return;
	}

	try {
		const collectionRef = admin.firestore().collection('posts')
		const pollCollectionRef = admin.firestore().collection('polls')
		const petitionCollectionRef = admin.firestore().collection('petitions')

		// 2. INPUT: Get data from request body
		const { searchParams } = request.body as RequestBody

		// 3. LOGIC: Existing logic remains the same
		const { nearbyPosts, nearPostIds } = await getNearbyPosts(collectionRef, searchParams)
		const { cityPosts, cityPostIds } = await getCityPosts(collectionRef, searchParams, nearPostIds)
		const countryPosts = await getCountryPosts(collectionRef, searchParams, nearPostIds, cityPostIds)

		// Polls Logic
		const { nearbyPolls, nearPollIds } = searchParams.searchLeaderPosts
			? await getNearbyPolls(pollCollectionRef, searchParams, userId)
			: { nearbyPolls: [], nearPollIds: [] }

		const { cityPolls, cityPollIds } = searchParams.searchLeaderPosts
			? await getCityPolls(pollCollectionRef, searchParams, userId, nearPollIds)
			: { cityPolls: [], cityPollIds: [] }

		const countryPolls = searchParams.searchLeaderPosts
			? await getCountryPolls(pollCollectionRef, searchParams, userId, cityPollIds)
			: []

		// Petitions Logic
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

		response.status(200).json(completeFeed)
	} catch (err) {
		console.error("Error fetching feed:", err)

		response.status(500).json({
			error: 'Unable to fetch feed posts',
			code: 'internal'
		})
	}
})