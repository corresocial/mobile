import React, { createContext, useState } from 'react'
import * as LocalAuthentication from 'expo-local-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PhoneAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth'
import { auth } from '../services/firebase'
import { getUser } from '../services/firebase/user/getUser'

import { PostCollection, UserCollection } from '../services/firebase/types'

const phoneAuth = new PhoneAuthProvider(auth)

type AuthContextType = {
	userDataContext: UserCollection
	setUserDataOnContext: (data: UserCollection | { newUser?: boolean }) => void
	getUserDataFromSecureStore: (requireAuthentication?: boolean, accountIdentifier?: boolean) => Promise<UserCollection>
	hasValidLocalUser: () => Promise<boolean>
	setDataOnSecureStore: (key: string, data: any) => Promise<boolean>
	deleteLocaluser: () => Promise<void>
	setRemoteUserOnLocal: (uid?: string, userData?: UserCollection) => Promise<boolean | undefined>
	getLastUserPost: () => PostCollection | {}
	sendSMS: (completeNumber: string, recaptchaVerifier: any) => Promise<string>
	validateVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<UserCredential>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
	children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
	const [userDataContext, setUserDataContext] = useState({})

	const getUserDataFromSecureStore = async (requireAuthentication?: boolean, accountIdentifier?: boolean) => {
		try {
			if (requireAuthentication) {
				const storedUser = await handleMethodWithAuthentication(getLocalUserData)

				if (!storedUser) {
					throw new Error('Erro ao validar identidade')
				}
				return storedUser
			}

			const storedUser = await getLocalUserData()

			if (accountIdentifier) {
				return { userId: storedUser.userId, name: storedUser.name }
			}

			return storedUser
		} catch (err) {
			console.log(err)
			return null
		}
	}

	const handleMethodWithAuthentication = async (secureMethod: any) => {
		const config = {
			cancelLabel: 'cancelLabel',
			promptMessage: 'Confirme sua identidade',
			requireConfirmation: false
		}

		const hasAuth = await LocalAuthentication.authenticateAsync(config)
		if (hasAuth.success) {
			const result = await secureMethod()
			return result
		}

		throw new Error('Authentication failed')
	}

	const getLocalUserData = async () => {
		try {
			const storagedDataJSON = await AsyncStorage.getItem('corre.user')
			const storagedData = storagedDataJSON ? JSON.parse(storagedDataJSON) : {}
			return storagedData
		} catch (error) {
			console.log(error)
			return null
		}
	}

	const hasValidLocalUser = async () => {
		const storedUser = await getLocalUserData()
		return storedUser && storedUser.userId
	}

	const setDataOnSecureStore = async (key: string, data: any) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify({ ...userDataContext, ...data }))
			return true
		} catch (err) {
			console.log(`Error: ${err}`)
			return false
		}
	}

	const deleteLocaluser = async () => {
		setUserDataContext({})
		await AsyncStorage.removeItem('corre.user')
	}

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserCollection) => {
		if (uid) {
			const currentUser = await getUser(uid)
			if (currentUser && currentUser.userId) {
				setUserDataContext({
					...currentUser,
					userId: uid
				})
				await setDataOnSecureStore('corre.user', {
					...currentUser,
					userId: uid
				})
				return true
			}

			setUserDataContext({ ...localUserData })
		} else {
			if (localUserData?.userId) {
				const currentUser = { ...localUserData }
				setUserDataContext({ ...currentUser })
			} else {
				console.log('Nenhum usuário local localizado')
				return false
			}
			return true
		}
	}

	const sendSMS = async (completeNumber: string, recaptchaVerifier: any) => {
		const verificationCodeId = await phoneAuth.verifyPhoneNumber(
			completeNumber,
			recaptchaVerifier,
		)
			.then((codeId) => codeId)
			.catch((err: any) => {
				console.log(err)
				switch (err.code) {
					case 'auth/too-many-requests': throw new Error('Aguarde, no momento você já solicitou muitas vezes!')
					default: throw new Error('Houve um erro ao tentar lhe enviar o código de verificação!')
				}
			})

		return verificationCodeId
	}

	const validateVerificationCode = async (verificationCodeId: string, verificationCode: string) => {
		const credential = PhoneAuthProvider.credential(
			verificationCodeId,
			verificationCode,
		)

		const userCredential = await signInWithCredential(auth, credential)
		return userCredential
	}

	const setUserDataOnContext = (data: UserCollection | { newUser?: boolean }) => {
		setUserDataContext({
			...userDataContext, ...data
		})
	}

	const getLastUserPost = () => {
		try {
			const { posts: userPosts }: PostCollection[] | any = userDataContext
			const lastUserPost: PostCollection = userPosts[0]
			return lastUserPost
		} catch (err) {
			return []
		}
	}

	/* const authDataProvider = React.useMemo(() => ({
		userDataContext,
		setUserDataOnContext,
		getUserDataFromSecureStore,
		hasValidLocalUser,
		setDataOnSecureStore,
		deleteLocaluser,
		setRemoteUserOnLocal,
		sendSMS,
		validateVerificationCode
	}), []) */

	return (
		<AuthContext.Provider
			value={{
				userDataContext,
				setUserDataOnContext,
				getUserDataFromSecureStore,
				hasValidLocalUser,
				setDataOnSecureStore,
				deleteLocaluser,
				setRemoteUserOnLocal,
				getLastUserPost,
				sendSMS,
				validateVerificationCode
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

const useAuth = () => {
	/* const auth = useContext(AuthContext)
	return auth */
}

export { AuthProvider, AuthContext, useAuth }
