import axios from 'axios'

import { RequestData, SearchParams } from '../types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function notifyUsersOnLocation(searchParams: SearchParams, requestData: RequestData) {
	return axios.post(`${FIREBASE_CLOUD_URL}/notifyUsersOnLocation`, { searchParams, requestData })
		.then((res) => console.log(res.status))
		.catch((err) => console.log(err))
}

export { notifyUsersOnLocation }
