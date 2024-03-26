import React, { createContext, useState } from 'react'

import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'

import { PostCollection } from '@domain/post/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps, UserData } from './types'

import { auth } from '@infrastructure/firebase/index'

const { localStorage, remoteStorage } = useUserRepository()

const phoneAuth = new PhoneAuthProvider(auth)

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function AuthProvider({ children }: AuthProviderProps) {
	const [userDataContext, setUserDataContext] = useState({})

	const hasValidLocalUser = async () => {
		const storedUser = await localStorage.getLocalUserData()
		return !!(storedUser && storedUser.userId)
	}

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserData) => {
		if (uid) {
			const currentUser = await remoteStorage.getUserData(uid)
			if (currentUser && currentUser.userId) {
				setUserDataContext({
					...currentUser,
					userId: uid
				})
				await localStorage.saveLocalUserData({
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
