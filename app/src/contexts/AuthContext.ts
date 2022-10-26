import React from "react";
import {
    ApplicationVerifier,
    PhoneAuthProvider,
    signInWithCredential,
    signOut,
} from 'firebase/auth';
import { auth } from "../services/Firebase/Firebase";

import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { getUser } from "../services/Firebase/user/getUser";
import { UserCollection } from "../services/Firebase/types";

const phoneAuth = new PhoneAuthProvider(auth)

const secureStoreOptions = {
    /* requireAuthentication: true,
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, 
    authenticationPrompt: 'Digita a senha aí poha!' */
}

const LocalAuthenticationOptions: LocalAuthentication.LocalAuthenticationOptions = {
    promptMessage: 'Confirme sua identidade',
    cancelLabel: 'USAR PADRÃO',
    requireConfirmation: true,
    disableDeviceFallback: false,
}

const localUserIsValidToLogin = (userJSON: any, requireAuthentication?: boolean) => {
    if (!requireAuthentication) return false
    try {
        if (!userJSON) return false
        const userObject: UserCollection = JSON.parse(userJSON as string)
        if (Object.keys(userObject).includes('userId') && Object.keys(userObject).includes('name')) {
            return true
        } else {
            console.log('Os dados presentes no secure storage não são suficientes para realizar login')
        }
        return
    } catch (err) {
        console.log(err)
        return false
    }
}

export const authentication = {
    async getDataFromSecureStore(key: string, requireAuthentication?: boolean) {
        try {
            // await SecureStore.deleteItemAsync('corre.user') // Tests only

            const user = await SecureStore.getItemAsync(key, secureStoreOptions)

            if (localUserIsValidToLogin(user, requireAuthentication) && !!requireAuthentication) {
                await LocalAuthentication.isEnrolledAsync()
                const result = await LocalAuthentication.authenticateAsync(LocalAuthenticationOptions)
                if (!result.success) throw 'Não foi possível identificar usuário'
            }

            return user
        } catch (err) {
            console.log('Error: ' + err) // TODO Define ErrorBoundary
            return false
        }
    },

    async setDataOnSecureStore(key: string, data: any) {
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(data), secureStoreOptions)
        } catch (err) {
            console.log('Error: ' + err) // TODO Define ErrorBoundary
            return false
        }
    },

    async deleteLocaluser() {
        await SecureStore.deleteItemAsync('corre.user')
    },

    async setRemoteUserOnLocal(uid?: string) {
        if (uid) {
            const currentUser = await getUser(uid);
            await authentication.setDataOnSecureStore('corre.user', {
                ...currentUser,
                userId: uid
            })
        } else {
            const localUserJSON = await authentication.getDataFromSecureStore('corre.user');
            if (!!localUserJSON) {
                const localUser = JSON.parse(localUserJSON)
                const currentUser = await getUser(localUser.identification.uid);
                await authentication.setDataOnSecureStore('corre.user', {
                    ...localUser,
                    currentUser
                })
            } else {
                console.log('Nenhum usuário local localizado')
            }
        }
    },

    async sendSMS(completeNumber: string, recaptchaVerifier: any) {
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
        const credential = PhoneAuthProvider.credential(
            verificationCodeId,
            verificationCode,
        );
        const userCredential = await signInWithCredential(auth, credential);
        return userCredential;
    }
}

export const AuthContext = React.createContext(authentication);
