import { callCloudFunction } from '@infrastructure/firebase/cloudFunctions'

async function checkUserPhoneAlreadyRegistredCloud(phoneNumber: string) {
	try {
		const response = await callCloudFunction<{ phoneNumber: string }, boolean>(
			'checkUserPhoneAlreadyRegistred',
			{ phoneNumber }
		)
		return response
	} catch (error) {
		console.log('Cloud function error:', error)
		return false
	}
}

export { checkUserPhoneAlreadyRegistredCloud }
