import axios from 'axios'

import { SmasRecoveryNISData, SmasService } from '@domain/entities/smas/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function getNisByUserData(searchParams: SmasRecoveryNISData, smasService: SmasService) {
	console.log({ ...searchParams, queryType: smasService })
	return axios.post(`${FIREBASE_CLOUD_URL}/smasAPI`, { ...searchParams, queryType: smasService })
		.then((res) => {
			return { NIS: res.data, status: 200 }
		})
		.catch((err) => {
			if (err.response.status === 404) return { NIS: '', status: 404 }
			if (err.response.status !== 200) return { NIS: '', status: 500 }
			return { NIS: '', status: 500 }
		})
}

export { getNisByUserData }
