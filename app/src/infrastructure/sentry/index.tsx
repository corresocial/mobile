/* eslint-disable no-undef */
import * as Sentry from '@sentry/react-native'

import { getEnvVars } from '@infrastructure/environment'

const { DSN_SENTRY, ENVIRONMENT } = getEnvVars()

const sentryConfig = {
	dsn: DSN_SENTRY,
	enableInExpoDevelopment: true,
	debug: false, // Set it to `FALSE` in production
	enableNative: true, // Set it to `TRUE` in production
	autoInitializeNativeSdk: true
}

const startSentry = () => {
	console.log(`Dev Mode: ${__DEV__}`)
	if (!__DEV__ && ENVIRONMENT !== 'dev') {
		Sentry.init(sentryConfig)
	}
}

export { startSentry }
