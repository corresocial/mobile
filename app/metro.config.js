// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')

const { getSentryExpoConfig } = require('@sentry/react-native/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const config = { ...(getDefaultConfig(__dirname) || {}), ...(getSentryExpoConfig(__dirname) || {}) }

config.transformer = {
	...config.transformer,
	babelTransformerPath: require.resolve('react-native-svg-transformer'),
	assetPlugins: ['expo-asset/tools/hashAssetFiles'],
	getTransformOptions: async () => ({
		transform: {
			experimentalImportSupport: true,
			inlineRequires: true,
		},
	}),
}
//
config.resolver = {
	...config.resolver,
	assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
	sourceExts: [...config.resolver.sourceExts, 'svg', 'd.ts'],
}

module.exports = config
