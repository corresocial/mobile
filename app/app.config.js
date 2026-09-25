require('dotenv').config({ quiet: true })

/* eslint-disable camelcase */
/* eslint-disable import/no-default-export */
export default () => {
	const GOOGLE_SERVICES_INFO_PLIST = `build/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/google-services-info.plist`
	const GOOGLE_SERVICES_JSON = `build/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/google-services.json`
	const ANDROID_MAPS_API_KEY = process.env.NODE_ENV === 'production' ? process.env.PROD_ANDROID_MAPS_API_KEY : process.env.ANDROID_MAPS_API_KEY

	// Pods do React Native Firebase precisam de linkagem estática com useFrameworks: 'static'
	const RN_FIREBASE_PODS = ['RNFBApp', 'RNFBAnalytics', 'RNFBAuth', 'RNFBCrashlytics', 'RNFBDatabase', 'RNFBFirestore', 'RNFBFunctions', 'RNFBStorage']

	const version = '0.11.0'
	const easUpdateChannel = process.env.NODE_ENV === 'production' ? '0.11.0' : 'development-build'

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
				buildNumber: '85',
				infoPlist: {
					NSCameraUsageDescription: 'Você precisa permitir o acesso a câmera para tirar fotos de perfil e posts.',
					NSLocationWhenInUseUsageDescription: 'Você precisa permitir o acesso a localização para encontrar posts e perfis perto de você.',
					NSPhotoLibraryUsageDescription: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts.',
					NSFaceIDUsageDescription: 'Usamos o bloqueio do app com TouchID ou FaceID para garantir a segurança da sua conta.',
					CFBundleURLTypes: [
						{ CFBundleURLSchemes: [process.env.IOS_URL_SCHEME, 'com.corresocial.corresocial', 'corre'].filter(Boolean) }
					]
				},
				supportsTablet: true,
				googleServicesFile: GOOGLE_SERVICES_INFO_PLIST
			},
			android: {
				versionCode: 85,
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
				]
			},
			extra: {
				eas: {
					projectId: '82d2d182-5397-4921-9056-8aa7efc9a9a4'
				}
			},
			plugins: [
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
						url: 'https://sentry.io/'
					}
				],
				[
					'expo-splash-screen',
					{
						image: './assets/foreground.png',
						imageWidth: 280,
						resizeMode: 'contain',
						backgroundColor: '#FFAA33'
					}
				],
				'react-native-compressor',
				[
					'@react-native-firebase/app',
					{
						ios: {
							disableSPM: true
						}
					}
				],
				'@react-native-firebase/auth',
				'@react-native-firebase/crashlytics',
				[
					'react-native-maps',
					{
						androidGoogleMapsApiKey: ANDROID_MAPS_API_KEY
					}
				],
				[
					'expo-build-properties',
					{
						ios: {
							useFrameworks: 'static',
							forceStaticLinking: RN_FIREBASE_PODS,
							privacyManifestAggregationEnabled: true
						},
						android: {
							enableMinifyInReleaseBuilds: true,
							enableShrinkResourcesInReleaseBuilds: true,
							usesCleartextTraffic: true,
							enablePngCrunchInReleaseBuilds: false,
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
					'@react-native-google-signin/google-signin'
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
				['./plugins/gradle-config.js']
			],
			web: {
				favicon: './assets/favicon.png'
			},
			// 2.0.0: Expo SDK 57. Não publicar updates deste runtime para builds do SDK 51 (runtime 1.0.0)
			runtimeVersion: '2.0.0'
		}
	})
}
