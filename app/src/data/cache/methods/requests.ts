const cacheRequestConfig = { // TODO Integrar ao requestImages
	homeFeed: {
		persistenceTime: 86400000 // Dia
	},
	stripeProducts: {
		persistenceTime: 86400000 * 7
	},
	algoliaPosts: {
		persistenceTime: 86400000
	},
}

export { cacheRequestConfig }
