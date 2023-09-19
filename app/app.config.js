/* eslint-disable import/no-default-export */
export default ({ config }) => {
	return {
		...config,
		android: {
			...config.android,
			googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
			config: {
				googleMaps: {
					apiKey: process.env.PROD_ANDROID_MAPS_API_KEY
				}
			}
		},
		ios: {
			...config.ios,
			config: {
				googleMapsApiKey: process.env.PROD_IOS_MAPS_API_KEY
			}
		}
	}
}
