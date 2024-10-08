/* eslint-disable import/no-default-export */
const { withGradleProperties } = require('@expo/config-plugins')

module.exports = (config) => {
	return withGradleProperties(config, (gradleConfig) => {
		const newModResults = gradleConfig.modResults.map((item) => {
			if (item.type === 'property' && item.key === 'org.gradle.jvmargs') {
				return {
					type: 'property',
					key: 'org.gradle.jvmargs',
					value: '-Xmx4096m -XX:MaxMetaspaceSize=1024m'
				}
			}
			return item
		})

		const newGradle = { ...gradleConfig, modResults: newModResults }

		return newGradle
	})
}
