import { getEnvVars } from '@infrastructure/environment'

const { DSN_SENTRY } = getEnvVars()

const sentryConfig = {
	dsn: DSN_SENTRY,
	enableInExpoDevelopment: true,
	debug: false, // Set it to `FALSE` in production
	enableNative: true, // Set it to `TRUE` in production
	autoInitializeNativeSdk: true
}

export { sentryConfig }
