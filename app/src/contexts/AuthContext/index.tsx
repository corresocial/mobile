import React, { createContext, useContext, useState } from 'react'

import { PostEntity } from '@domain/post/entity/types'
import { UserAuthData, UserEntity, UserEntityOptional, UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps } from './types'

const { syncWithRemoteUser } = useUserDomain()

const initialValue: AuthContextType = {
	userDataContext: {
		userId: '',
		name: ''
	},
	setUserDataOnContext: () => { },
	setRemoteUserOnLocal: (uid?: string, localUserData?: UserEntity) => new Promise<boolean>(() => { }),
	getLastUserPost: () => ({}) as PostEntity,
	userAuthData: { cellNumber: '' },
	setUserAuthDataOnContext: () => null,
	userRegistrationData: { cellNumber: '', email: '' },
	setUserRegisterDataOnContext: () => null,
}

const AuthContext = createContext<AuthContextType>(initialValue)

function AuthProvider({ children }: AuthProviderProps) {
	const [userRegistrationData, setUserRegisterDataContext] = useState<UserRegisterData>(initialValue.userRegistrationData)
	const [userAuthData, setUserAuthDataContext] = useState<UserAuthData>(initialValue.userAuthData)
	const [userDataContext, setUserDataContext] = useState(initialValue.userDataContext)

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserEntity) => {
		try {
			const userData = await syncWithRemoteUser(useUserRepository, uid, localUserData)
			if (userData && typeof userData && Object.keys(userData).length > 1) {
				setUserDataContext({ ...userData })
				return true
			}
			return false
		} catch (error: any) {
			console.log(error)
			return false
		}
	}

	const getLastUserPost = () => {
		try {
			const { posts: userPosts } = userDataContext

			if (!userPosts || (userPosts && !userPosts.length)) return {} as PostEntity

			const lastUserPost = userPosts[userPosts.length - 1]
			return lastUserPost
		} catch (err) {
			return {} as PostEntity
		}
	}

	const setUserRegisterDataOnContext = (data: Partial<UserRegisterData>) => {
		setUserRegisterDataContext({ ...userRegistrationData, ...data })
	}

	const setUserAuthDataOnContext = (data: Partial<UserAuthData>) => {
		setUserAuthDataContext({ ...userAuthData, ...data })
	}

	const setUserDataOnContext = (data: UserEntityOptional) => {
		setUserDataContext({ ...userDataContext, ...data })
	}

	// REFACTOR useMemo & useCallbaack em todos os contextos

	return (
		<AuthContext.Provider
			value={{
				userDataContext,
				setUserDataOnContext,
				getLastUserPost,
				setRemoteUserOnLocal,
				userAuthData,
				setUserAuthDataOnContext,
				userRegistrationData,
				setUserRegisterDataOnContext,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, AuthContext, useAuthContext }
