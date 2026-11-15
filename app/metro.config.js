// Learn more https://docs.expo.dev/guides/customizing-metro
const { getSentryExpoConfig } = require('@sentry/react-native/metro')

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getSentryExpoConfig(__dirname)

const config = {
	...defaultConfig,
	transformer: {
		...defaultConfig.transformer,
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
		babelTransformerPath: require.resolve('react-native-svg-transformer/expo')
	},
	resolver: {
		...defaultConfig.resolver,
		assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
		sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'd.ts'],
	}
}

module.exports = config
