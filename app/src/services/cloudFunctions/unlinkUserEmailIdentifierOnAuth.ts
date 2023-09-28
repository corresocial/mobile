import axios from 'axios'
import { getEnvVars } from '../../../environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

const unlinkUserEmailIdentifierOnAuthCloud = async (userId: string) => {
	return axios.post(`${FIREBASE_CLOUD_URL}/unlinkUserEmailIdentifierOnAuth`, { userId })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
		})
}

export { unlinkUserEmailIdentifierOnAuthCloud }
