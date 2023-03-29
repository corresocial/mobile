import { DSN_SENTRY } from '@env'

const sentryConfig = {
	dsn: DSN_SENTRY,
	enableInExpoDevelopment: true,
	debug: true, // Set it to `FALSE` in production
	enableNative: false, // Set it to `TRUE` in production
	autoInitializeNativeSdk: true
}

export { sentryConfig }
