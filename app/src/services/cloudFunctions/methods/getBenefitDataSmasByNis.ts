import axios from 'axios'

import { SmasService } from '@domain/smas/entity/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function getBenefitDataSmasByNis(nis: string, smasService: SmasService) {
	return axios.post(`${FIREBASE_CLOUD_URL}/smasAPI`, { nis, queryType: smasService })
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			if (err.response.status === 404) return 404
			if (err.response.status !== 200) return 500
			return 500
		})
}

export { getBenefitDataSmasByNis }
