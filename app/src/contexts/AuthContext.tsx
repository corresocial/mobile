import React, { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

import {
    PhoneAuthProvider,
    signInWithCredential,
    UserCredential,
} from 'firebase/auth';

import { auth } from "../services/Firebase/Firebase";
import { UserData } from './types'

import { getUser } from "../services/Firebase/user/getUser";
import { UserCollection } from "../services/Firebase/types";

const phoneAuth = new PhoneAuthProvider(auth)

type AuthContextType = {
    userDataContext: UserData;
    setUserDataOnContext: (data: UserData) => void
    getDataFromSecureStore: (key: string, requireAuthentication?: boolean) => Promise<string | false | null>
    localUserIsValidToLogin: (userJSON: any, requireAuthentication?: boolean) => boolean | undefined
    setDataOnSecureStore: (key: string, data: any) => Promise<false | undefined>
    deleteLocaluser: () => Promise<void>
    setRemoteUserOnLocal: (uid?: string) => Promise<void>
    sendSMS: (completeNumber: string, recaptchaVerifier: any) => Promise<string>
    validateVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<UserCredential>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
    children: React.ReactNode
}


function AuthProvider({ children }: AuthProviderProps) {
    const [userDataContext, setUserDataContext] = useState({})

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

    const getDataFromSecureStore = async (key: string, requireAuthentication?: boolean) => {
        try {
            const user = await SecureStore.getItemAsync(key, secureStoreOptions)

            if (localUserIsValidToLogin(user, requireAuthentication) && !!requireAuthentication) {
                await LocalAuthentication.isEnrolledAsync()
                const result = await LocalAuthentication.authenticateAsync(LocalAuthenticationOptions)
                if (!result.success) throw 'Não foi possível identificar usuário'
            }

            return user
        } catch (err) {
            console.log('Error: ' + err)
            return false
        }
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

    const setDataOnSecureStore = async (key: string, data: any) => {
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(data), secureStoreOptions)
        } catch (err) {
            console.log('Error: ' + err)
            return false
        }
    }

    const deleteLocaluser = async () => {
        await SecureStore.deleteItemAsync('corre.user')
    }

    const setRemoteUserOnLocal = async (uid?: string) => {
        if (uid) {
            const currentUser = await getUser(uid);
            await setDataOnSecureStore('corre.user', {
                ...currentUser,
                userId: uid
            })
        } else {
            const localUserJSON = await getDataFromSecureStore('corre.user');
            if (!!localUserJSON) {
                const localUser = JSON.parse(localUserJSON)
                const currentUser = await getUser(localUser.identification.uid);
                await setDataOnSecureStore('corre.user', {
                    ...localUser,
                    currentUser
                })
            } else {
                console.log('Nenhum usuário local localizado')
                throw 'Nenhum usuário localizado'
            }
        }
    }

    const sendSMS = async (completeNumber: string, recaptchaVerifier: any) => {
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
    }

    const validateVerificationCode = async (verificationCodeId: string, verificationCode: string) => {
        const credential = PhoneAuthProvider.credential(
            verificationCodeId,
            verificationCode,
        );
        const userCredential = await signInWithCredential(auth, credential);
        return userCredential;
    }

    const setUserDataOnContext = (data: UserData) => { // TODO This function reload application on every request
        setUserDataContext({ ...userDataContext, ...data })
    }

    return (
        <AuthContext.Provider value={{
            userDataContext,
            setUserDataOnContext,
            getDataFromSecureStore,
            localUserIsValidToLogin,
            setDataOnSecureStore,
            deleteLocaluser,
            setRemoteUserOnLocal,
            sendSMS,
            validateVerificationCode
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}

export { AuthProvider, AuthContext , useAuth}
