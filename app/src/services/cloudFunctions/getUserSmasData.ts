import axios from 'axios'

import { SmasService } from '@domain/entities/smas/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const getUserSmasData = async (nis: string, smasService: SmasService) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/smasAPI`, { nis, queryType: smasService })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err.status)
			return false
		})
}

export { getUserSmasData }
