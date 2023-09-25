/* eslint-disable import/no-default-export */
export default ({ config }) => {
	return {
		...config,
		android: {
			...config.android,
			googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
		}

	}
}
