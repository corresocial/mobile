/* eslint-disable func-names */
module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['module:@react-native/babel-preset'],
		plugins: [
			'react-native-reanimated/plugin',
			'module:react-native-dotenv',
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@globalTypes': './src/types',
						'@contexts': './src/contexts',
						'@data': './src/data',
						'@services': './src/services',
						'@domain': './src/domain',
						'@infrastructure': './src/infrastructure',
						'@presentation': './src/presentation',
						'@assets': './src/presentation/assets',
						'@common': './src/presentation/common',
						'@components': './src/presentation/components',
						'@newComponents': './src/presentation/newComponents',
						'@routes': './src/presentation/routes',
						'@screens': './src/presentation/screens',
						'@utils': './src/presentation/utils',
						'@newutils': './src/newutils',
						'@utils-ui': './src/presentation/utils-ui',
						'@adapters': './src/presentation/adapters'
					}
				}
			]
		]
	}
}
