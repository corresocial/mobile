import * as LocalAuthentication from 'expo-local-authentication'
import React, { createContext, useState } from 'react'

import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps, UserData } from './types'
import { PostCollection } from '@services/firebase/types'

import { auth } from '@services/firebase'

const { localUser, remoteUser } = useUserRepository()

const phoneAuth = new PhoneAuthProvider(auth)

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function AuthProvider({ children }: AuthProviderProps) {
	const [userDataContext, setUserDataContext] = useState({})

	const getUserDataFromSecureStore = async (requireAuthentication?: boolean, accountIdentifier?: boolean) => {
		try {
			if (requireAuthentication) {
				const storedUser = await handleMethodWithAuthentication(localUser.getLocalUserData)

				if (!storedUser) {
					throw new Error('Erro ao validar identidade')
				}
				return storedUser
			}

			const storedUser = await localUser.getLocalUserData()
			if (!storedUser) return null

			if (accountIdentifier) {
				return { userId: storedUser.userId, name: storedUser.name }
			}

			return storedUser
		} catch (err) {
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

	const hasValidLocalUser = async () => {
		const storedUser = await localUser.getLocalUserData()
		return !!(storedUser && storedUser.userId)
	}

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserData) => {
		if (uid) {
			const currentUser = await remoteUser.getUserData(uid) // REFACTOR userRepository.getUserData
			if (currentUser && currentUser.userId) {
				setUserDataContext({
					...currentUser,
					userId: uid
				})
				await localUser.saveLocalUserData({
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
				return true
			}

			console.log('Nenhum usuário local localizado')
			return false
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
					case 'auth/too-many-requests': throw new Error('auth/too-many-requests')
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

	const setUserDataOnContext = (data: UserData) => {
		setUserDataContext({
			...userDataContext, ...data
		})
	}

	const getLastUserPost = () => {
		try {
			const { posts: userPosts }: PostCollection[] | any = userDataContext

			if (userPosts && !userPosts.length) return {} as PostCollection

			const lastUserPost: PostCollection = userPosts[0]
			return lastUserPost
		} catch (err) {
			return {} as PostCollection
		}
	}

	// REFACTOR useMemo

	return (
		<AuthContext.Provider
			value={{
				userDataContext,
				setUserDataOnContext,
				getUserDataFromSecureStore,
				hasValidLocalUser,
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

export { AuthProvider, AuthContext }
