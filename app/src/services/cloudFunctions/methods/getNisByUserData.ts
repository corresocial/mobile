import { sendEvent } from '@newutils/methods/analyticsEvents'
import axios from 'axios'

import { SmasRecoveryNISData, SmasService } from '@domain/smas/entity/types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function getNisByUserData(searchParams: SmasRecoveryNISData, smasService: SmasService) {
	return axios.post(`${FIREBASE_CLOUD_URL}/smasAPI`, { ...searchParams, queryType: smasService })
		.then((res) => {
			sendEvent('recovery_nis', { smasResponse: 'success' })
			return { NIS: res.data.toString(), status: 200 }
		})
		.catch((err) => {
			if (err.response.status === 404) {
				sendEvent('recovery_nis', { smasResponse: 'not_found' })
				return { NIS: '', status: 404 }
			}

			if (err.response.status !== 200) {
				sendEvent('recovery_nis', { smasResponse: 'failed' })
				return { NIS: '', status: 500 }
			}

			sendEvent('recovery_nis', { smasResponse: 'failed' })
			return { NIS: '', status: 500 }
		})
}

export { getNisByUserData }
