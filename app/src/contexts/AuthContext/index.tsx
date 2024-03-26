import React, { createContext, useState } from 'react'

import { PostCollection } from '@domain/post/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps, UserData } from './types'

const { syncWithRemoteUser } = useUserDomain()

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function AuthProvider({ children }: AuthProviderProps) {
	const [userDataContext, setUserDataContext] = useState({})

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserData) => {
		try {
			const userData = await syncWithRemoteUser(useUserRepository, uid, localUserData)

			if (userData) {
				setUserDataContext({ ...userData })
				return true
			}

			return true
		} catch (error: any) {
			console.log(error)
			return false
		}
	}

	const setUserDataOnContext = (data: UserData) => {
		setUserDataContext({ ...userDataContext, ...data })
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

	// REFACTOR useMemo & useCallbaack em todos os contextos

	return (
		<AuthContext.Provider
			value={{
				userDataContext,
				setUserDataOnContext,
				setRemoteUserOnLocal,
				getLastUserPost
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider, AuthContext }
