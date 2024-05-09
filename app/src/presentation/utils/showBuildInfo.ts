import * as Application from 'expo-application'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { Alert, Platform } from 'react-native'

import { getEnvVars } from '@infrastructure/environment'

export async function showBuildInfo() {
	const { ENVIRONMENT } = getEnvVars()

	const appVersion = Constants.deviceName
	const platformVersion = Platform.Version
	const deviceOsVersion = Device.osVersion
	const { nativeBuildVersion,
		nativeApplicationVersion,
		androidId,
		applicationId,
		applicationName,
		getLastUpdateTimeAsync,
	} = Application
	const { platformApiLevel } = Device

	const lastUpdateTime = Platform.OS === 'android' ? await getLastUpdateTimeAsync() : 'indisponível no IOS'

	const { appOwnership } = Constants
	const supportedSdks = Constants.systemVersion

	Alert.alert(`${appVersion} - ${platformVersion}`, `
	ENVIRONMENT: ${ENVIRONMENT}

	lastUpdateTime: ${lastUpdateTime}
	androidId: ${androidId}
	applicationId: ${applicationId}
	applicationName: ${applicationName}
	platformApiLevel: ${platformApiLevel}

	platformVersion: ${platformVersion}
	deviceOsVersion: ${deviceOsVersion}
	nativeApplicationVersion: ${nativeApplicationVersion}
	nativeBuildVersion: ${nativeBuildVersion}
	appOwnership: ${appOwnership}
	supportedSdks: ${supportedSdks}
	`)
}
