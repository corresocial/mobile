require('dotenv').config({ quiet: true })

/* eslint-disable camelcase */
/* eslint-disable import/no-default-export */
export default () => {
	// APP_ENV escolhe dev/prod sem mexer no NODE_ENV: um build de release com NODE_ENV=development
	// embute as libs em modo desenvolvimento e o app fecha ao abrir.
	const isProd = process.env.APP_ENV ? process.env.APP_ENV === 'prod' : process.env.NODE_ENV === 'production'
	const GOOGLE_SERVICES_INFO_PLIST = process.env.GOOGLE_SERVICES_INFO_PLIST || `build/${isProd ? 'prod' : 'dev'}/google-services-info.plist`
	const GOOGLE_SERVICES_JSON = process.env.GOOGLE_SERVICES_JSON || `build/${isProd ? 'prod' : 'dev'}/google-services.json`
	const ANDROID_MAPS_API_KEY = isProd ? process.env.PROD_ANDROID_MAPS_API_KEY : process.env.ANDROID_MAPS_API_KEY

	// Pods do React Native Firebase precisam de linkagem estática com useFrameworks: 'static'
	const RN_FIREBASE_PODS = ['RNFBApp', 'RNFBAnalytics', 'RNFBAuth', 'RNFBCrashlytics', 'RNFBDatabase', 'RNFBFirestore', 'RNFBFunctions', 'RNFBStorage']

	const version = '0.13.0'
	const easUpdateChannel = isProd ? '0.13.0' : 'development-build'

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
				buildNumber: '101',
				infoPlist: {
					NSCameraUsageDescription: 'Você precisa permitir o acesso a câmera para tirar fotos de perfil e posts.',
					NSLocationWhenInUseUsageDescription: 'Você precisa permitir o acesso a localização para encontrar posts e perfis perto de você.',
					NSPhotoLibraryUsageDescription: 'Você precisa permitir o acesso a galeria para escolher fotos de perfil e posts.',
					NSFaceIDUsageDescription: 'Usamos o bloqueio do app com TouchID ou FaceID para garantir a segurança da sua conta.',
					// O app só usa criptografia padrão do sistema (HTTPS/TLS): isento de conformidade de exportação
					ITSAppUsesNonExemptEncryption: false,
					CFBundleURLTypes: [
						{ CFBundleURLSchemes: [process.env.IOS_URL_SCHEME, 'com.corresocial.corresocial', 'corre'].filter(Boolean) }
					]
				},
				supportsTablet: true,
				googleServicesFile: GOOGLE_SERVICES_INFO_PLIST,
				// App Check em produção (App Attest, com DeviceCheck como alternativa)
				entitlements: {
					'com.apple.developer.devicecheck.appattest-environment': 'production'
				}
			},
			android: {
				versionCode: 101,
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
					'android.permission.USE_FINGERPRINT',
					'android.permission.FOREGROUND_SERVICE',
					'android.permission.CAMERA',
					'android.permission.INTERNET',
					'android.permission.AD_ID',
					'android.permission.SCHEDULE_EXACT_ALARM',
					'android.permission.Intent.ACTION_BOOT_COMPLETED'
				],
				// Fotos e vídeos vêm do seletor do sistema (expo-image-picker): sem permissões amplas de mídia (política do Google Play)
				blockedPermissions: [
					'android.permission.READ_MEDIA_IMAGES',
					'android.permission.READ_MEDIA_VIDEO',
					'android.permission.READ_MEDIA_AUDIO',
					'android.permission.READ_MEDIA_VISUAL_USER_SELECTED',
					'android.permission.ACCESS_MEDIA_LOCATION',
					'android.permission.READ_EXTERNAL_STORAGE',
					'android.permission.WRITE_EXTERNAL_STORAGE'
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
						imageWidth: 310,
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
				'@react-native-firebase/app-check',
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
				['./plugins/gradle-config.js'],
				['./plugins/keyboard-no-resize.js']
			],
			web: {
				favicon: './assets/favicon.png'
			},
			// 2.0.0: Expo SDK 57. Não publicar updates deste runtime para builds do SDK 51 (runtime 1.0.0)
			runtimeVersion: '2.0.0'
		}
	})
}
