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
const { remoteStorage } = usePostRepository()

const initialValue: AuthContextType = {
	userDataContext: {
		userId: '',
		name: ''
	},
	userPostsContext: [] as PostEntity[],
	setUserDataOnContext: () => { },
	setRemoteUserOnLocal: (uid?: string, localUserData?: UserEntity) => new Promise<boolean>(() => { }),
	userAuthData: { cellNumber: '' },
	setUserAuthDataOnContext: () => null,
	userRegistrationData: { cellNumber: '', email: '' },
	setUserRegisterDataOnContext: () => null,
	loadUserPosts: () => Promise.resolve([] as PostEntity[]),
	getLastUserPost: () => ({} || null) as PostEntity,
	updateUserPost: (postData: PostEntity) => {},
	removeUserPost: (postData: PostEntity) => Promise.resolve()
}

const AuthContext = createContext<AuthContextType>(initialValue)

function AuthProvider({ children }: AuthProviderProps) {
	const [userRegistrationData, setUserRegisterDataContext] = useState<UserRegisterData>(initialValue.userRegistrationData)
	const [userAuthData, setUserAuthDataContext] = useState<UserAuthData>(initialValue.userAuthData)
	const [userDataContext, setUserDataContext] = useState(initialValue.userDataContext)
	const [userPostsContext, setUserPosts] = useState(initialValue.userPostsContext)

	const loadUserPosts = async (userId?: string) => {
		return getPostsByOwner(usePostRepository, userId || userDataContext.userId, 10)
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

	const setUserRegisterDataOnContext = (data: Partial<UserRegisterData>) => {
		setUserRegisterDataContext({ ...userRegistrationData, ...data })
	}

	const setUserAuthDataOnContext = (data: Partial<UserAuthData>) => {
		setUserAuthDataContext({ ...userAuthData, ...data })
	}

	const setUserDataOnContext = (data: UserEntityOptional) => {
		setUserDataContext({ ...userDataContext, ...data })
	}

	const getLastUserPost = () => {
		try {
			if (!userPostsContext || (userPostsContext && !userPostsContext.length)) return null
			return userPostsContext[0]
		} catch (err) {
			return {} as PostEntity
		}
	}

	const removeUserPost = async (postData: PostEntity) => {
		try {
			if (!postData) return
			await remoteStorage.deletePost(postData.postId, postData.owner.userId)
			await remoteStorage.deletePostMedias(postData.picturesUrl || [], 'pictures')
			const postsWithoutDeletedPost = userPostsContext.filter((post) => post.postId !== postData.postId)
			setUserPosts(postsWithoutDeletedPost)
		} catch (error) {
			console.log(error)
		}
	}

	const updateUserPost = (postData: PostEntity) => {
		try {
			if (!postData) return
			const updatedUserPosts = userPostsContext.map((post) => (post.postId === postData.postId ? postData : post))
			setUserPosts(updatedUserPosts)
		} catch (error) {
			console.log(error)
		}
	}

	// REFACTOR useMemo & useCallbaack em todos os contextos

	return (
		<AuthContext.Provider
			value={{
				userDataContext,
				userPostsContext,
				setUserDataOnContext,
				setRemoteUserOnLocal,
				userAuthData,
				setUserAuthDataOnContext,
				userRegistrationData,
				setUserRegisterDataOnContext,
				loadUserPosts,
				getLastUserPost,
				updateUserPost,
				removeUserPost
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, AuthContext, useAuthContext }
