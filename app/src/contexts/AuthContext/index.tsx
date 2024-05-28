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
	const [postListIsOver, setPostListIsOver] = useState(false)

	const queryClient = useQueryClient()

	const setRemoteUserOnLocal = async (uid?: string) => {
		try {
			const userData = await syncWithRemoteUser(useUserRepository, uid || userDataContext.userId)
			if (userData && typeof userData && Object.keys(userData).length > 1) {
				await loadUserPosts(userData.userId, false, true)
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

	const loadUserPosts = useCallback(async (userId?: string | null, refresh?: boolean, firstLoad?: boolean) => {
		try {
			if (postListIsOver && !firstLoad && !refresh) return

			const postOwnerId = userId || userDataContext.userId

			const lastPost = !refresh && userPostsContext.length && !firstLoad ? userPostsContext[userPostsContext.length - 1] : undefined
			const queryKey = ['user.posts', postOwnerId, lastPost]
			let posts = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getPostsByOwner(usePostRepository, postOwnerId, 10, lastPost),
				refresh
			)
			posts = posts.map((p: PostEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!posts || (posts && !posts.length)) return setPostListIsOver(true)

			if (lastPost && lastPost.postId === posts[posts.length - 1].postId) return

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.posts', postOwnerId] })
				setPostListIsOver(false)
				setUserPosts([...posts])
				return
			}
			firstLoad ? setUserPosts([...posts]) : setUserPosts([...userPostsContext, ...posts])
		} catch (error) {
			console.log(error)
		}
	}, [userPostsContext, postListIsOver])

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
	}), [userRegistrationData, userAuthData, userDataContext, userPostsContext, postListIsOver])

	return (
		<AuthContext.Provider value={authContextProviderData} >
			{children}
		</AuthContext.Provider>
	)
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, AuthContext, useAuthContext }
