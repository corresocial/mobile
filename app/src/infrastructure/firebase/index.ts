/* eslint-disable import/no-default-export */
/* eslint-disable camelcase */

// export const firestore = getFirestore(Firebase)
// export const auth = getAuth(Firebase)
// export const storage = getStorage(Firebase)
// export const functions = getFunctions(Firebase)
// export const realTimeDatabase = getDatabase(Firebase)
// export const smasRealTimeDatabase = getDatabase(Firebase, FIREBASE_smas_databaseURL)

// Não é necessário chamar `initializeApp` com o react-native-firebase
// Ele detecta automaticamente as configurações do Firebase adicionadas nos arquivos nativos (GoogleService-Info.plist e google-services.json)

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth, { firebase } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

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

firebase.setReactNativeAsyncStorage(AsyncStorage)

export const firebaseAuth = auth()
export const firebaseFirestore = firestore()
export const firebaseStorage = storage()
export const firebaseDatabase = database()
export const firebaseSmasDatabase = firebase.app().database(FIREBASE_smas_databaseURL)

export const authProviders = {
	PhoneAuthProvider: auth.PhoneAuthProvider,
	GoogleAuthProvider: auth.GoogleAuthProvider,
}

export { firebase }

// firebase.initializeApp(firebaseConfig)

// firebase.initializeApp(firebaseConfig)
// export { firebase }

// Se você tiver múltiplos bancos de dados, pode configurá-los assim:
// export const firebaseSMASRealTimeDatabase = database('https://YOUR_SMAS_DATABASE_URL')

// export default Firebase
