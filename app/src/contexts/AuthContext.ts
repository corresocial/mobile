import React from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    ApplicationVerifier,
    PhoneAuthProvider,
    signInWithCredential,
    signOut,
} from 'firebase/auth';
import { auth } from "../services/Firebase/Firebase";

import * as SecureStore from 'expo-secure-store';

const phoneAuth = new PhoneAuthProvider(auth)

export const authentication = {
    async getDataFromSecureStore(key: string) {
        try {
            const user = await SecureStore.getItemAsync(key)
            return user
        } catch (err) {
            console.log('Error: ' + err) // TODO Define ErrorBoundary
            return false
        }
    },

    async setDataOnSecureStore(key: string, userData: any) {
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(userData))
        } catch (err) {
            console.log('Error: ' + err) // TODO Define ErrorBoundary
            return false
        }
    },

    async sendSMS(completeNumber: string, recaptchaVerifier: any) { // TODO Type
        const verificationCodeId = await phoneAuth.verifyPhoneNumber(
            completeNumber,
            recaptchaVerifier,
        )
            .then(verificationCodeId => verificationCodeId)
            .catch((err: any) => {
                switch (err.code) {
                    case 'auth/too-many-requests': throw 'Aguarde, no momento você já solicitou muitas vezes!'
                    default: throw 'Houve um erro ao tentar lhe enviar o código de verificação!'
                }
            })

        return verificationCodeId
    },

    async validateVerificationCode(verificationCodeId: string, verificationCode: string) {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationCodeId,
                verificationCode,
            );
            const userCredential = await signInWithCredential(auth, credential);
            return userCredential;

        } catch (err: any) { // TODO Type
            switch (err.code) {
                case 'auth/invalid-verification-code':
                    return 'Código de verificação inválido';
                case 'auth/invalid-verification-id':
                    return 'algo deu errado, por favor tente novamente';
                case 'auth/code-expired':
                    return 'seu código expirou, solicite novamente';
                default:
                    return err.message;
            }
        }
    }


}

export const AuthContext = React.createContext(authentication);
