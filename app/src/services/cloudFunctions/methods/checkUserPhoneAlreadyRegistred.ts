import { httpsCallable } from '@react-native-firebase/functions'

import { firebaseFunctions } from '@infrastructure/firebase'

async function checkUserPhoneAlreadyRegistredCloud(phoneNumber: string) {
	try {
		// 1. Reference the function
		const checkPhoneFn = httpsCallable(firebaseFunctions, 'checkUserPhoneAlreadyRegistred')

		console.log('checkPhone', checkPhoneFn)
		// 2. Call it (Auth token is sent automatically)
		const response = await checkPhoneFn({ phoneNumber })

		// 3. The result is in response.data
		return response.data as boolean
	} catch (error) {
		console.log('Cloud function error:', error)
		return false
	}
}

export { checkUserPhoneAlreadyRegistredCloud }
