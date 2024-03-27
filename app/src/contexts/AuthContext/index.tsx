import React, { createContext, useState } from 'react'

import { PostCollection } from '@domain/post/entity/types'
import { UserEntity, UserEntityOptional } from '@domain/user/entity/types'
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
	getLastUserPost: () => ({}) as PostCollection
}

const AuthContext = createContext<AuthContextType>(initialValue)

function AuthProvider({ children }: AuthProviderProps) {
	const [userDataContext, setUserDataContext] = useState(initialValue.userDataContext)

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserEntity) => {
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

	const setUserDataOnContext = (data: UserEntityOptional) => {
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
