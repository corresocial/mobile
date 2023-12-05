import axios from 'axios'
import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const checkUserPhoneAlreadyRegistredCloud = async (phoneNumber: string) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/checkUserPhoneAlreadyRegistred`, { phoneNumber })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
			throw new Error(err)
		})
}

export { checkUserPhoneAlreadyRegistredCloud }
