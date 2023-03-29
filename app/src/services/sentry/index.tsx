import { DSN_SENTRY } from "@env";

const sentryConfig = {
	dsn: DSN_SENTRY,
	enableInExpoDevelopment: true,
	debug: false, // Set it to `FALSE` in production
	enableNative: false, // Set it to `false` in production
	autoInitializeNativeSdk: true,
};

export { sentryConfig };
