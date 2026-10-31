/* eslint-disable no-undef */
import * as Sentry from '@sentry/react-native'

import { getEnvVars } from '@infrastructure/environment'

const { DSN_SENTRY, ENVIRONMENT } = getEnvVars()

const sentryConfig = {
	dsn: DSN_SENTRY,
	environment: ENVIRONMENT || 'dev', // separa dev e prod no painel do Sentry
	debug: false, // Set it to `FALSE` in production
	enableNative: true, // Set it to `TRUE` in production
	autoInitializeNativeSdk: true,
	sendDefaultPii: false // não envia IP, e-mail nem telefone do usuário
}

const startSentry = () => {
	console.log(`Dev Mode: ${__DEV__}`)
	// Builds de release (inclusive os de teste do dev) reportam erros; só o modo de desenvolvimento local não.
	if (!__DEV__ && DSN_SENTRY) {
		Sentry.init(sentryConfig)
	}
}

export { startSentry }
