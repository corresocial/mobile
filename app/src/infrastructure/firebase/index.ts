/* eslint-disable import/no-default-export */
/* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

import { getEnvVars } from '@infrastructure/environment'

const {
	FIREBASE_apiKey,
	FIREBASE_authDomain,
	FIREBASE_databaseURL,
	FIREBASE_smas_databaseURL,
	FIREBASE_projectId,
	FIREBASE_storageBucket,
	FIREBASE_messagingSenderId,
	FIREBASE_appId,
	FIREBASE_measurementId,
} = getEnvVars()

const firebaseConfig = {
	apiKey: FIREBASE_apiKey,
	authDomain: FIREBASE_authDomain,
	projectId: FIREBASE_projectId,
	storageBucket: FIREBASE_storageBucket,
	messagingSenderId: FIREBASE_messagingSenderId,
	appId: FIREBASE_appId,
	measurementId: FIREBASE_measurementId,
	databaseURL: FIREBASE_databaseURL,
	smasDatabaseURL: FIREBASE_smas_databaseURL
}

const Firebase = initializeApp(firebaseConfig)

initializeAuth(Firebase, {
	persistence: getReactNativePersistence(AsyncStorage)
})

export const firestore = getFirestore(Firebase)
export const auth = getAuth(Firebase)
export const storage = getStorage(Firebase)
export const functions = getFunctions(Firebase)
export const realTimeDatabase = getDatabase(Firebase)
export const smasRealTimeDatabase = getDatabase(Firebase, FIREBASE_smas_databaseURL)

export default Firebase
