/* eslint-disable import/no-default-export */
/* eslint-disable camelcase */

import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAnalytics } from '@react-native-firebase/analytics'
import { getApp, setReactNativeAsyncStorage } from '@react-native-firebase/app'
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from '@react-native-firebase/auth'
import { getDatabase } from '@react-native-firebase/database'
import { getFirestore } from '@react-native-firebase/firestore'
import { getFunctions } from '@react-native-firebase/functions'
import { getStorage } from '@react-native-firebase/storage'

import { getEnvVars } from '@infrastructure/environment'

import { startAppCheck } from './appCheck'

const { FIREBASE_smas_databaseURL } = getEnvVars()

setReactNativeAsyncStorage(AsyncStorage)
startAppCheck()

export const firebaseAuth = getAuth()
export const firebaseFirestore = getFirestore()
export const firebaseStorage = getStorage()
export const firebaseDatabase = getDatabase()
export const firebaseAnalytics = getAnalytics()
export const firebaseFunctions = getFunctions(getApp(), 'southamerica-east1')
// 
export const firebaseSmasDatabase = getDatabase(getApp(), FIREBASE_smas_databaseURL)

export const authProviders = {
	PhoneAuthProvider,
	GoogleAuthProvider,
}
