// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config')

const { getSentryExpoConfig } = require('@sentry/react-native/metro')

// /** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getSentryExpoConfig(__dirname)

const config = {
	...defaultConfig,
	transformer: {
		...defaultConfig.transformer,
		inlineRequires: true,
		assetPlugins: ['expo-asset/tools/hashAssetFiles'],
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
		babelTransformerPath: require.resolve('react-native-svg-transformer')
	},
	resolver: {
		...defaultConfig.resolver,
		assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
		sourceExts: [...defaultConfig.resolver.sourceExts, 'js', 'svg', 'd.ts'],
	}
}

module.exports = config
