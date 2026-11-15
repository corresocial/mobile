/* eslint-disable no-undef */
import { getApp } from '@react-native-firebase/app'
import { initializeAppCheck, ReactNativeFirebaseAppCheckProvider } from '@react-native-firebase/app-check'

import { getEnvVars } from '@infrastructure/environment'

const { ENVIRONMENT, APP_CHECK_DEBUG_TOKEN } = getEnvVars()

/**
 * Faz o app provar ao Firebase que é o app original (Play Integrity no Android, App Attest no iOS).
 * Em dev usa o provedor de debug, com um token registrado no console do Firebase.
 * Por ora o servidor só mede: falhar aqui nunca pode impedir o app de abrir.
 */
function startAppCheck() {
	try {
		const useDebugProvider = __DEV__ || ENVIRONMENT === 'dev' || !ENVIRONMENT

		const provider = new ReactNativeFirebaseAppCheckProvider()
		provider.configure({
			android: {
				provider: useDebugProvider ? 'debug' : 'playIntegrity',
				debugToken: useDebugProvider ? APP_CHECK_DEBUG_TOKEN : undefined
			},
			apple: {
				provider: useDebugProvider ? 'debug' : 'appAttestWithDeviceCheckFallback',
				debugToken: useDebugProvider ? APP_CHECK_DEBUG_TOKEN : undefined
			}
		})

		initializeAppCheck(getApp(), { provider, isTokenAutoRefreshEnabled: true })
	} catch (error) {
		console.log('[appCheck]: não foi possível iniciar', error)
	}
}

export { startAppCheck }
