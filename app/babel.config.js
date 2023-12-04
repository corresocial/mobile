/* eslint-disable func-names */
module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
		plugins: [
			'react-native-reanimated/plugin',
			'module:react-native-dotenv',
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@contexts': './src/contexts',
						'@routes': './src/routes',
						'@services': './src/services',
						'@presentation': './src/presentation',
						'@domain': './src/domain',
						'@infrastructure': './src/infrastructure',
						'@data': './src/data',
					}
				}
			]
		]
	}
}
