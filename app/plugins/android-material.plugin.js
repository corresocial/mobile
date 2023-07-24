// android-material.plugins.js
const { withAndroidStyles } = require('@expo/config-plugins')

module.exports = function androidStyles(config) {
	return withAndroidStyles(config, async (config) => {
		config.modResults.resources.style = config.modResults.resources.style.map((s) => {
			if (s.$ && s.$.name === 'AppTheme') {
				return {
					...s,
					$: {
						name: 'AppTheme',
						parent: 'Theme.MaterialComponents.DayNight.NoActionBar',
					},
				}
			}
			return s
		})

		return config
	})
}
