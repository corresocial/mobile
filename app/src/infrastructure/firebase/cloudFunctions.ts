import axios from 'axios'

import { getEnvVars } from '@infrastructure/environment'

import { firebaseAuth } from './index'

/**
 * Call a Firebase Cloud Function with authentication token
 *
 * This utility replaces httpsCallable by making standard HTTP requests
 * with Firebase auth tokens in the Authorization header.
 *
 * @param functionName - Name of the cloud function to call
 * @param data - Data to send to the function
 * @returns Response data from the cloud function
 * @throws Error if not authenticated or request fails
 */
export async function callCloudFunction<TData = any, TResponse = any>(
	functionName: string,
	data?: TData
): Promise<TResponse> {
	// Get current user's auth token
	const { currentUser } = firebaseAuth

	if (!currentUser && functionName !== 'checkUserPhoneAlreadyRegistred') {
		throw new Error('User must be authenticated to call cloud functions')
	}

	const token = currentUser ? await currentUser.getIdToken() : undefined

	// Get cloud function base URL from environment
	const { FIREBASE_CLOUD_URL } = getEnvVars()

	if (!FIREBASE_CLOUD_URL) {
		throw new Error('FIREBASE_CLOUD_URL not configured in environment')
	}

	// Make authenticated request
	try {
		const response = await axios.post(
			`${FIREBASE_CLOUD_URL}/${functionName}`,
			data || {},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		)

		return response.data as TResponse
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Extract error message from cloud function response
			const errorMessage = error.response?.data?.message || error.message
			const errorCode = error.response?.data?.code || 'unknown'

			throw new Error(`Cloud function error [${errorCode}]: ${errorMessage}`)
		}

		throw error
	}
}
