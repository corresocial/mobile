import React, { createContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import * as LocalAuthentication from 'expo-local-authentication'

import { PhoneAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth'
import { auth } from '../services/firebase'
import { getUser } from '../services/firebase/user/getUser'

import { PostCollection, UserCollection } from '../services/firebase/types'

const phoneAuth = new PhoneAuthProvider(auth)

type AuthContextType = {
	userDataContext: UserCollection
	setUserDataOnContext: (data: UserCollection) => void
	getDataFromSecureStore: (key: string, requireAuthentication?: boolean) => Promise<string | false | null>
	localUserIsValidToLogin: (userJSON: any, requireAuthentication?: boolean) => boolean | undefined
	setDataOnSecureStore: (key: string, data: any) => Promise<boolean>
	deleteLocaluser: () => Promise<void>
	setRemoteUserOnLocal: (uid?: string) => Promise<boolean | undefined>
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

	const LocalAuthenticationOptions: LocalAuthentication.LocalAuthenticationOptions = {
		promptMessage: 'Confirme sua identidade',
		cancelLabel: 'USAR PADRÃO',
		requireConfirmation: true,
		disableDeviceFallback: false,
	}

	const getDataFromSecureStore = async (key: string, requireAuthentication?: boolean) => {
		try {
			const user = await SecureStore.getItemAsync(key)
			if (localUserIsValidToLogin(user, requireAuthentication) && !!requireAuthentication) {
				await LocalAuthentication.isEnrolledAsync()
				const result = await LocalAuthentication.authenticateAsync(LocalAuthenticationOptions)
				if (!result.success) throw new Error('Não foi possível identificar usuário, autenticação cancelada pelo usuário')
			}

			return user
		} catch (err) {
			console.log(err)
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
			}
			console.log('Os dados presentes no secure storage não são suficientes para realizar login')
			return false
		} catch (err) {
			console.log(err)
			return false
		}
	}

	const setDataOnSecureStore = async (key: string, data: any) => {
		try {
			await SecureStore.setItemAsync(key, JSON.stringify({ ...userDataContext, ...data }))
			return true
		} catch (err) {
			console.log(`Error: ${err}`)
			return false
		}
	}

	const deleteLocaluser = async () => {
		setUserDataContext({})
		await SecureStore.deleteItemAsync('corre.user')
	}

	const setRemoteUserOnLocal = async (uid?: string) => {
		if (uid) {
			const currentUser = await getUser(uid)
			setUserDataContext({
				...currentUser,
				userId: uid
			})
			await setDataOnSecureStore('corre.user', {
				...currentUser,
				userId: uid
			})
		} else {
			const localUserJSON = await getDataFromSecureStore('corre.user')
			if (localUserJSON) {
				const localUser = JSON.parse(localUserJSON)
				const currentUser = await getUser(localUser.identification.uid)
				setUserDataContext({
					...currentUser,
					userId: uid
				})
				await setDataOnSecureStore('corre.user', {
					...localUser,
					currentUser
				})
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

	const setUserDataOnContext = (data: UserCollection) => {
		setUserDataContext({
			...userDataContext, ...data
		})
	}

	const getLastUserPost = () => {
		try {
			const { posts: userPosts }: PostCollection[] | any = userDataContext
			const lastUserPost: PostCollection = userPosts[userPosts.length - 1]
			return lastUserPost
		} catch (err) {
			return []
		}
	}

	/* const authDataProvider = React.useMemo(() => ({
		userDataContext,
		setUserDataOnContext,
		getDataFromSecureStore,
		localUserIsValidToLogin,
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
				getDataFromSecureStore,
				localUserIsValidToLogin,
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
