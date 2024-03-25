import axios from 'axios'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function checkUserPhoneAlreadyRegistredCloud(phoneNumber: string) {
	try {
		const response: boolean = await axios.post(`${FIREBASE_CLOUD_URL}/checkUserPhoneAlreadyRegistred`, { phoneNumber })
			.then((res) => res.data)
			.catch((error) => {
				console.log(error)
				return false
			})

		return response
	} catch (error) {
		console.log(error)
		return false
	}
}

export { checkUserPhoneAlreadyRegistredCloud }
