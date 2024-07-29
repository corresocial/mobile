import { sendEvent } from '@newutils/methods/analyticsEvents'
import axios from 'axios'

import { SmasService } from '@domain/smas/entity/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function getBenefitDataSmasByNis(nis: string, smasService: SmasService) {
	return axios.post(`${FIREBASE_CLOUD_URL}/smasAPI`, { nis, queryType: smasService })
		.then((res) => {
			sendEvent('smas_search', { smasService, smasResponse: 'success' })
			return res.data
		})
		.catch((err) => {
			if (err.response.status === 404) {
				sendEvent('smas_search', { smasService, smasResponse: 'not_found' })
				return 404
			}
			if (err.response.status !== 200) {
				sendEvent('smas_search', { smasService, smasResponse: 'failed' })
				return 500
			}

			sendEvent('smas_search', { smasService, smasResponse: 'failed' })
			return 500
		})
}

export { getBenefitDataSmasByNis }
