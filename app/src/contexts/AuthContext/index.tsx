import React, { createContext, useContext, useState } from 'react'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { UserAuthData, UserEntity, UserEntityOptional, UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps } from './types'

const { syncWithRemoteUser } = useUserDomain()
const { getPostsByOwner } = usePostDomain()

const initialValue: AuthContextType = {
	userDataContext: {
		userId: '',
		name: ''
	},
	userPostsContext: [] as PostEntity[],
	setUserDataOnContext: () => { },
	setRemoteUserOnLocal: (uid?: string, localUserData?: UserEntity) => new Promise<boolean>(() => { }),
	getLastUserPost: () => ({}) as PostEntity,
	loadUserPosts: () => Promise.resolve([] as PostEntity[]),
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
	const [userPostsContext, setUserPosts] = useState(initialValue.userPostsContext)

	const loadUserPosts = async (userId?: string) => {
		return getPostsByOwner(usePostRepository, userId || userDataContext.userId, 3)
	}

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserEntity) => {
		try {
			const userData = await syncWithRemoteUser(useUserRepository, uid, localUserData)
			if (userData && typeof userData && Object.keys(userData).length > 1) {
				const posts = await loadUserPosts(userData.userId)
				const mergedUnapprovedData = posts.map((p) => ({ ...p, ...(p.unapprovedData || {}) }))
				setUserPosts(mergedUnapprovedData as PostEntity[])
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
			if (!userPostsContext || (userPostsContext && !userPostsContext.length)) return {} as PostEntity
			const lastUserPost = userPostsContext[userPostsContext.length - 1]
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
				userPostsContext,
				setUserDataOnContext,
				getLastUserPost,
				setRemoteUserOnLocal,
				loadUserPosts,
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
