import axios from 'axios'

import { SmasService } from '@domain/entities/smas/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const getUserSmasData = async (nis: string, smasService: SmasService) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/smasAPI`, { nis, queryType: smasService })
		.then((res) => {
			if (res.status === 404) return 404
			if (res.status !== 200) return 500
			return res.data
		})
		.catch((err) => {
			console.log(err.statusCode)
			return 500
		})
}

export { getUserSmasData }
