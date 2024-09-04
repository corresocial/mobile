/* eslint-disable no-undef */
import * as LocalAuthentication from 'expo-local-authentication'

async function handleMethodWithDeviceAuthentication(secureMethod: any) {
	try {
		const config = {
			cancelLabel: 'cancelLabel',
			promptMessage: 'Confirme sua identidade',
			requireConfirmation: false
		}

		const hasDeviceAuthRegistered = await LocalAuthentication.getEnrolledLevelAsync()

		if (!hasDeviceAuthRegistered /* || __DEV__ */) { // CURRENT
			const result: boolean = await secureMethod()
			return result
		}

		const hasAuth = await LocalAuthentication.authenticateAsync(config)
		if (hasAuth.success) {
			const result: boolean = await secureMethod()
			return result
		}

		return false
	} catch (error) {
		console.log(error)
		return false
	}
}

export { handleMethodWithDeviceAuthentication }
