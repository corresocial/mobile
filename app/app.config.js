require('dotenv').config()

/* eslint-disable camelcase */
/* eslint-disable import/no-default-export */
export default () => {
	const GOOGLE_SERVICES_INFO_PLIST = 'build/prod/google-services-info.plist'
	const GOOGLE_SERVICES_JSON = 'build/prod/google-services.json'
	const IOS_MAPS_API_KEY = process.env.PROD_IOS_MAPS_API_KEY
	const ANDROID_MAPS_API_KEY = process.env.PROD_ANDROID_MAPS_API_KEY

	const version = '0.12.0'
	const easUpdateChannel = '0.12.0'

	return ({
		expo: {
			name: 'corre',
			owner: 'corresocial',
			scheme: ['com.corresocial.corresocial', 'corre'],
			slug: 'corresocial',
			version: version,
			orientation: 'portrait',
			userInterfaceStyle: 'light',
			icon: './assets/icon.png',
			splash: {
				image: './assets/splash.png',
				resizeMode: 'contain',
				backgroundColor: '#FFAA33',
				statusBarStyle: 'dark'
			},
			updates: {
				enabled: true,
				requestHeaders: {
					'expo-channel-name': easUpdateChannel || 'development'
				},
				fallbackToCacheTimeout: 0,
				url: 'https://u.expo.dev/82d2d182-5397-4921-9056-8aa7efc9a9a4',

			},
			assetBundlePatterns: [
				'**/*'
			],
			ios: {
				bundleIdentifier: 'corre',
				buildNumber: '95',
				infoPlist: {
					NSCameraUsageDescription: 'Você precisa permitir o acesso a câmera para tirar fotos de perfil e posts.',
					NSLocationWhenInUseUsageDescription: 'Você precisa permitir o acesso a localização para encontrar posts e perfis perto de você.',
					NSPhotoLibraryUsageDescription: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts.',
					NSFaceIDUsageDescription: 'Usamos o bloqueio do app com TouchID ou FaceID para garantir a segurança da sua conta.',
					CFBundleURLTypes: [
						{ CFBundleURLSchemes: [process.env.IOS_URL_SCHEME, 'com.corresocial.corresocial', 'corre'] }
					]
				},
				supportsTablet: true,
				googleServicesFile: GOOGLE_SERVICES_INFO_PLIST,
				splash: {
					image: './assets/splash.png',
					resizeMode: 'contain',
					backgroundColor: '#FFAA33'
				},
				config: {
					googleMapsApiKey: IOS_MAPS_API_KEY
				}
			},
			android: {
				versionCode: 95,
				package: 'com.corresocial.corresocial',
				googleServicesFile: GOOGLE_SERVICES_JSON,
				icon: './assets/icon.png',
				adaptiveIcon: {
					foregroundImage: './assets/foreground.png',
					backgroundColor: '#FFAA33'
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
					'android.permission.CAMERA',
					'android.permission.INTERNET',
					'android.permission.AD_ID',
					'android.permission.SCHEDULE_EXACT_ALARM',
					'android.permission.Intent.ACTION_BOOT_COMPLETED'
				],
				config: {
					googleMaps: {
						apiKey: ANDROID_MAPS_API_KEY
					}
				}
			},
			extra: {
				eas: {
					projectId: '82d2d182-5397-4921-9056-8aa7efc9a9a4'
				}
			},
			plugins: [
				'@react-native-community/datetimepicker',
				[
					'expo-font',
					{
						fonts: [
							'./src/presentation/assets/fonts/Arvo_700Bold.ttf',
							'./src/presentation/assets/fonts/Arvo_400Regular.ttf',
							'./src/presentation/assets/fonts/Nunito_700Bold.ttf',
							'./src/presentation/assets/fonts/Nunito_600SemiBold.ttf'
						]
					}
				],
				[
					'expo-location',
					{
						locationAlwaysAndWhenInUsePermission: 'Você precisa permitir o acesso a localização para encontrar posts e perfis perto de você.'
					}
				],
				[
					'@sentry/react-native/expo',
					{
						organization: 'corre-dev',
						project: 'react-native',
					}
				],
				'react-native-compressor',
				'expo-av',
				'@react-native-firebase/app',
				'@react-native-firebase/auth',
				'@react-native-firebase/crashlytics',
				[
					'expo-build-properties',
					{
						ios: {
							useFrameworks: 'static',
							// use_modular_headers: true,
							autolinking: true,
							privacyManifestAggregationEnabled: true,
							deploymentTarget: '15.1',
							// newArchEnabled: true
						},
						android: {
							// minSdkVersion: 23,
							compileSdkVersion: 35,
							targetSdkVersion: 35,
							buildToolsVersion: '35.0.0',
							// kotlinVersion: '2.0.21',
							enableProguardInReleaseBuilds: true,
							enableShrinkResourcesInReleaseBuilds: true,
							enableR8: true,
							usesCleartextTraffic: true,
							enablePngCrunchInReleaseBuilds: false,
							// newArchEnabled: false,
							extraProguardRules: `
							-keep public class com.horcrux.svg.** {*;}
							-keep public class com.stripe.android.pushProvisioning.** { *; }
							-keep public class com.android.tools.** { *; }
							-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivity$g
							-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivityStarter$Args
							-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivityStarter$Error
							-dontwarn com.stripe.android.pushProvisioning.PushProvisioningActivityStarter
							-dontwarn com.stripe.android.pushProvisioning.PushProvisioningEphemeralKeyProvider
							`
						}
					}
				],
				[
					'expo-media-library',
					{
						photosPermission: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts',
						savePhotosPermission: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts',
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
						icon: './assets/notification.png',
						color: '#FFAA33'
					}
				],
				[
					'expo-notifications',
					{
						icon: './assets/notification.png',
						color: '#FFAA33',
						defaultChannel: 'default'
					}
				],
				'expo-localization', [
					'@stripe/stripe-react-native',
					{
						merchantIdentifier: '',
						enableGooglePay: false
					}
				],
				[
					'@react-native-google-signin/google-signin',
					{
						iosUrlScheme: process.env.IOS_URL_SCHEME
					}
				],
				[
					'expo-asset',
					{
						assets: [
							'./assets',
							'./src/presentation/assets/imgs/'
						]
					}
				],
				[
					'expo-local-authentication',
					{
						faceIDPermission: 'Você precisa permitir a utilização do faceID para podermos garantir a segurança da sua conta'
					}
				],
				// ['./plugins/gradle-config.js'],
			],
			web: {
				favicon: './assets/favicon.png'
			},
			runtimeVersion: '1.0.0'
			// runtimeVersion: {
			// 	policy: 'appVersion'
			// }
		}
	})
}
