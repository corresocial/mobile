import { DSN_SENTRY } from "@env";

const sentryConfig = {
	dsn: DSN_SENTRY,
	enableInExpoDevelopment: true,
	debug: false, // Set it to `FALSE` in production
	enableNative: false, // Set it to `TRUE` in production
	autoInitializeNativeSdk: false,
};

export { sentryConfig };
