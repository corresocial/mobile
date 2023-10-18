import axios from 'axios'
import { getEnvVars } from '../../../environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const updateUserEmailIdentifierOnAuthCloud = async (userId: string, email?: string) => {
	if (!userId || !email) throw new Error('updateUserEmailIdentifierOnAuthCloud: Missing userId or email')

	return axios.post(`${FIREBASE_CLOUD_URL}/updateUserEmailIdentifierOnAuth`, { userId, email })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
		})
}

export { updateUserEmailIdentifierOnAuthCloud }
