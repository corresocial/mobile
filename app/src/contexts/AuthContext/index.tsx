import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { UserAuthData, UserEntity, UserEntityOptional, UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps } from './types'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

const { syncWithRemoteUser } = useUserDomain()
const { getPostsByOwner } = usePostDomain()

const { remoteStorage } = usePostRepository()
const { executeCachedRequest } = useCacheRepository()

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
	loadUserPosts: (userId?: string, refresh?: boolean, loadedPosts?: PostEntity[]) => Promise.resolve([] as PostEntity[]),
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
	const [postsListIsOver, setPostListIsOver] = useState(false)

	const queryClient = useQueryClient()

	const setRemoteUserOnLocal = async (uid?: string, localUserData?: UserEntity) => {
		try {
			const userData = await syncWithRemoteUser(useUserRepository, uid || userDataContext.userId, localUserData)
			if (userData && typeof userData && Object.keys(userData).length > 1) {
				setUserDataContext({ ...userData })
				const posts = await loadUserPosts(userData.userId)
				setUserPosts(posts || [])
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

	const loadUserPosts = useCallback(async (userId?: string, refresh?: boolean, loadedPosts?: PostEntity[]) => {
		try {
			if (postsListIsOver && !refresh) return

			const postOwnerId = userId || userDataContext.userId
			const userIsOwnerOfPosts = postOwnerId === userDataContext.userId

			// console.log('------------------------------------------')
			// console.log('postsListIsOver', postsListIsOver)
			// console.log('refresh', refresh)
			// console.log('postOwnerId', postOwnerId)
			// console.log('userIsOwnerOfPosts', userIsOwnerOfPosts ? 'SIM' : 'NÃO')

			const lastPost = userIsOwnerOfPosts
				? !refresh && userPostsContext.length ? userPostsContext[userPostsContext.length - 1] : undefined
				: !refresh && (loadedPosts && loadedPosts.length) ? loadedPosts[loadedPosts.length - 1] : undefined

			// console.log(lastPost ? lastPost.description : 'nullo')
			// console.log(['user.posts', postOwnerId, lastPost ? 'Object' : 'Initial'])

			const queryKey = ['user.posts', postOwnerId, lastPost]
			let posts = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getPostsByOwner(usePostRepository, postOwnerId, 2, lastPost),
				refresh
			)
			posts = posts.map((p: PostEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!posts || (posts && !posts.length)) {
				console.log('Acabaram os posts')
				setPostListIsOver(true)
				return []
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.posts', postOwnerId] })
				setPostListIsOver(false)
				userIsOwnerOfPosts && setUserPosts([...posts])
				return [...posts]
			}
			userIsOwnerOfPosts && setUserPosts([...userPostsContext, ...posts])
			return userIsOwnerOfPosts ? [...userPostsContext, ...posts] : [...(loadedPosts || []), ...posts]
		} catch (error) {
			console.log(error)
		}
	}, [userPostsContext, postsListIsOver])

	const getLastUserPost = () => {
		try {
			if (!userPostsContext || (userPostsContext && !userPostsContext.length)) return null
			return userPostsContext[0]
		} catch (error) {
			console.log(error)
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

	const authContextProviderData = useMemo(() => ({
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
	}), [userRegistrationData, userAuthData, userDataContext, userPostsContext, postsListIsOver])

	return (
		<AuthContext.Provider value={authContextProviderData} >
			{children}
		</AuthContext.Provider>
	)
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, AuthContext, useAuthContext }
