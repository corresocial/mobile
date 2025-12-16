/* eslint-disable import/no-default-export */
/* eslint-disable camelcase */

import AsyncStorage from '@react-native-async-storage/async-storage'
import analytics from '@react-native-firebase/analytics'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import storage from '@react-native-firebase/storage'

import { getEnvVars } from '@infrastructure/environment'

const {
	FIREBASE_smas_databaseURL
} = getEnvVars()

firebase.setReactNativeAsyncStorage(AsyncStorage)

export const firebaseAuth = auth()
export const firebaseFirestore = firestore()
export const firebaseStorage = storage()
export const firebaseDatabase = database()
export const firebaseAnalytics = analytics()
export const firebaseFunctions = firebase.app().functions('southamerica-east1')
export const firebaseSmasDatabase = firebase.app().database(FIREBASE_smas_databaseURL)

export const authProviders = {
	PhoneAuthProvider: auth.PhoneAuthProvider,
	GoogleAuthProvider: auth.GoogleAuthProvider,
}

export { firebase }
