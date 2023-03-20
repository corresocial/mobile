import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'
import { getDatabase } from "firebase/database";

import {
	FIREBASE_apiKey,
	FIREBASE_authDomain,
	FIREBASE_databaseURL,
	FIREBASE_projectId,
	FIREBASE_storageBucket,
	FIREBASE_messagingSenderId,
	FIREBASE_appId,
	FIREBASE_measurementId,
	FIRESTORE_REAL_TIME_DATABASE
} from '@env'

const firebaseConfig = {
	apiKey: FIREBASE_apiKey,
	authDomain: FIREBASE_authDomain,
	databaseURL: FIREBASE_databaseURL,
	projectId: FIREBASE_projectId,
	storageBucket: FIREBASE_storageBucket,
	messagingSenderId: FIREBASE_messagingSenderId,
	appId: FIREBASE_appId,
	measurementId: FIREBASE_measurementId,
	realTimeDatabase: FIRESTORE_REAL_TIME_DATABASE
}

const Firebase = initializeApp(firebaseConfig)

export const firestore = getFirestore(Firebase)
export const auth = getAuth(Firebase)
export const storage = getStorage(Firebase)
export const functions = getFunctions(Firebase)
export const database = getDatabase(Firebase)

export default Firebase
