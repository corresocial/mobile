// Initialize Cloud Firestore through Firebase
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import {
  FIREBASE_apiKey, FIREBASE_authDomain,
  FIREBASE_databaseURL,
  FIREBASE_projectId,
  FIREBASE_storageBucket,
  FIREBASE_messagingSenderId,
  FIREBASE_appId,
  FIREBASE_measurementId
} from '@env'; // TODO Type

const firebaseConfig = {
  apiKey: FIREBASE_apiKey,
  authDomain: FIREBASE_authDomain,
  databaseURL: FIREBASE_databaseURL,
  projectId: FIREBASE_projectId,
  storageBucket: FIREBASE_storageBucket,
  messagingSenderId: FIREBASE_messagingSenderId,
  appId: FIREBASE_appId,
  measurementId: FIREBASE_measurementId,
};

console.log(firebaseConfig)

const Firebase = initializeApp(firebaseConfig);

export const firestore = getFirestore(Firebase);
export const auth = getAuth(Firebase);
export const storage = getStorage(Firebase);
export const functions = getFunctions(Firebase);
export default Firebase;