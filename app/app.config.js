/* eslint-disable import/no-default-export */
export default {
	expo: {
		name: 'corre',
		owner: 'corresocial',
		scheme: 'com.corresocial.corresocial',
		slug: 'corresocial',
		version: '0.6.3',
		orientation: 'portrait',
		userInterfaceStyle: 'light',
		icon: './assets/icon.png',
		splash: {
			image: './assets/splash-screen.png',
			resizeMode: 'contain',
			backgroundColor: '#FA9938',
			statusBarStyle: 'dark'
		},
		hooks: {
			postPublish: [
				{
					file: 'sentry-expo/upload-sourcemaps',
					config: {
						organization: 'corre-dev',
						project: 'react-native'
					}
				}
			]
		},
		plugins: [
			[
				'expo-updates',
				{
					username: 'wellington-souza-abreu'
				}
			],
			[
				'expo-build-properties',
				{
					ios: {
						useFrameworks: 'static'
					},
					android: {
						compileSdkVersion: 33,
						targetSdkVersion: 33,
						buildToolsVersion: '31.0.0',
						enableProguardInReleaseBuilds: true,
						extraProguardRules: '-keep public class com.horcrux.svg.** {*;}'
					}
				}
			],
			[
				'expo-media-library',
				{
					photosPermission: 'Allow corre to access your photos.',
					savePhotosPermission: 'Allow corre to save photos.',
					isAccessMediaLocationEnabled: true
				}
			],
			[
				'expo-image-picker',
				{
					photosPermission: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts.',
					cameraPermission: 'Você precisa permitir o acesso a camera para tirar fotos de perfil e posts.'
				}
			],
			[
				'expo-camera',
				{
					cameraPermission: 'Você precisa permitir o acesso a camera para tirar fotos de perfil e posts.'
				}
			],
			[
				'expo-notifications',
				{
					icon: './assets/notification-icon.png',
					color: '#FA9938'
				}
			],
			'./plugins/react-native-maps-plugin.js',
			'./plugins/android-material-plugins.js',
			'sentry-expo',
			'expo-localization',
			[
				'@stripe/stripe-react-native',
				{
					merchantIdentifier: '',
					enableGooglePay: false
				}
			]
		],
		updates: {
			fallbackToCacheTimeout: 0,
			url: 'https://u.expo.dev/82d2d182-5397-4921-9056-8aa7efc9a9a4'
		},
		assetBundlePatterns: [
			'**/*'
		],
		ios: {
			buildNumber: '59',
			infoPlist: {
				NSCameraUsageDescription: 'Você precisa permitir o acesso a câmera para tirar fotos de perfil e posts.',
				NSLocationWhenInUseUsageDescription: 'Você precisa permitir o acesso a localização para encontrar posts e perfis perto de você.',
				NSPhotoLibraryUsageDescription: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts.',
				NSFaceIDUsageDescription: 'Usamos o bloquei do app com TouchID ou FaceID para garantir a segurança da sua conta.',
				CFBundleURLTypes: [
					{ CFBundleURLSchemes: [process.env.IOS_URL_SCHEME] }
				]
			},
			supportsTablet: true,
			bundleIdentifier: 'com.corresocial.corresocial',
			googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST,
			splash: {
				image: './assets/splash-screen.png',
				resizeMode: 'contain',
				backgroundColor: '#FA9938'
			},
			config: {
				googleMapsApiKey: process.env.MAPS_API_IOS
			}
		},
		android: {
			versionCode: 59,
			package: 'com.corresocial.corresocial',
			googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
			icon: './assets/icon.png',
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon-foreground.png',
				backgroundColor: '#FA9938'
			},
			permissions: [
				'android.permission.LOCATION',
				'android.permission.ACCESS_FINE_LOCATION',
				'android.permission.READ_MEDIA_IMAGES',
				'android.permission.READ_MEDIA_VIDEO',
				'android.permission.WRITE_EXTERNAL_STORAGE',
				'android.permission.READ_EXTERNAL_STORAGE',
				'android.permission.USE_FINGERPRINT',
				'android.permission.FOREGROUND_SERVICE',
				'android.permission.CAMERA'
			],
			config: {
				googleMaps: {
					apiKey: process.env.MAPS_API_ANDROID
				}
			}
		},
		web: {
			favicon: './assets/favicon.png'
		},
		extra: {
			eas: {
				projectId: '82d2d182-5397-4921-9056-8aa7efc9a9a4'
			}
		},
		runtimeVersion: {
			policy: 'sdkVersion'
		}
	}
}
