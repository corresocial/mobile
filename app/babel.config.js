module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			"babel-preset-expo",
			"module:metro-react-native-babel-preset",
		],
		plugins: [
			"react-native-reanimated/plugin",
			"module:react-native-dotenv",
			[
				"module-resolver",
				{
					root: ["./src"],
					alias: {
						"@assets": "./src/assets",
						"@common": "./src/common",
						"@components": "./src/components",
						"@contexts": "./src/contexts",
						"@routes": "./src/routes",
						"@services": "./src/services",
						"@screens": "./src/screens",
						"@utils": "./src/utils",
					},
				},
			],
		],
	};
};
