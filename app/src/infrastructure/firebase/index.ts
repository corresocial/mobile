/* eslint-disable import/no-default-export */
/* eslint-disable camelcase */

import AsyncStorage from '@react-native-async-storage/async-storage'
import analytics from '@react-native-firebase/analytics'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import { getEnvVars } from '@infrastructure/environment'

const {
	ENVIRONMENT,
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
}

// firebase.initializeApp(firebaseConfig)

firebase.setReactNativeAsyncStorage(AsyncStorage)

export const firebaseAuth = auth()
export const firebaseFirestore = firestore()
export const firebaseStorage = storage()
export const firebaseDatabase = database()
export const firebaseAnalytics = analytics()
export const firebaseSmasDatabase = firebase.app().database(FIREBASE_smas_databaseURL)

export const authProviders = {
	PhoneAuthProvider: auth.PhoneAuthProvider,
	GoogleAuthProvider: auth.GoogleAuthProvider,
}

export { firebase }
