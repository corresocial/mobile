import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { sendEvent } from '@newutils/methods/analyticsEvents'
import { useUtils } from '@newutils/useUtils'
import { useQueryClient } from '@tanstack/react-query'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { UserAuthData, UserEntityOptional, UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContextType, AuthProviderProps } from './types'
import { useAuthNavigation } from '@routes/Stack/hooks/useAuthNavigation'

import { auth } from '@infrastructure/firebase'
import { useAuthenticationService } from '@services/authentication/useAuthenticationService'
import { getNewDate } from '@utils-ui/common/date/dateFormat'
import { getNetworkStatus } from '@utils/deviceNetwork'

const { syncWithRemoteUser } = useUserDomain()
const { getPostsByOwner } = usePostDomain()

const { remoteStorage } = usePostRepository()
const { localStorage } = useUserRepository()
const { executeCachedRequest } = useCacheRepository()

const { mergeObjects, getLastItem } = useUtils()
const { handleMethodWithDeviceAuthentication } = useAuthenticationService()

const initialValue: AuthContextType = {
	userDataContext: {
		userId: '',
		name: ''
	},
	userPostsContext: [] as PostEntity[],
	setUserDataOnContext: () => { },
	setRemoteUserOnLocal: (uid?: string, refreshMode?: boolean) => new Promise<boolean>(() => { }),
	userAuthData: { cellNumber: '' },
	setUserAuthDataOnContext: () => null,
	userRegistrationData: { cellNumber: '', email: '' },
	setUserRegisterDataOnContext: () => null,
	performQuickSignin: (userId?: string, requireAuth?: boolean, noRedirect?: boolean) => Promise.resolve(true),
	loadUserPosts: (userId?: string, refresh?: boolean, loadedPosts?: PostEntity[]) => Promise.resolve([] as PostEntity[]),
	getLastUserPost: () => ({} || null) as PostEntity,
	addUserPost: (postData: PostEntity) => { },
	updateUserPost: (postData: PostEntity | PostEntity[]) => { },
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
	const { navigateToHome, navigateToAuthScreen } = useAuthNavigation()

	useEffect(() => {
		console.log('[auth]: Sessão inciada!')
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			console.log(user ? '[auth]: Usuário logado!' : '[auth]: Usuário não logado!')
			const hasValidLocalUser = await localStorage.hasValidLocalUser()
			if (user && hasValidLocalUser) return
			if (!user) return navigateToAuthScreen()
		})

		return unsubscribe
	}, [])

	// REFACTOR Quick signin virar um caso de uso
	const performQuickSignin = async (userId: string, requireAuth = true, noRedirect = false) => {
		try {
			const authenticatedUser = requireAuth
				? await handleMethodWithDeviceAuthentication(async () => {
					return setRemoteUserOnLocal(userId || auth.currentUser?.uid, true)
				})
				: setRemoteUserOnLocal(userId || auth.currentUser?.uid, true)

			sendEvent('user_authed', { authType: 'login' }, true)

			if (noRedirect) return authenticatedUser

			if (authenticatedUser) {
				navigateToHome()
				return authenticatedUser
			}

			return navigateToAuthScreen()
		} catch (error) {
			console.log(error)
			navigateToAuthScreen()
		}
	}

	const setRemoteUserOnLocal = async (uid?: string, refreshMode?: boolean) => {
		try {
			const userData = await syncWithRemoteUser(useUserRepository, uid || userDataContext.userId)

			const status = await getNetworkStatus()
			const hasNetworkConnection = status.isConnected && status.isInternetReachable

			if (userData && typeof userData && Object.keys(userData).length > 1) {
				refreshMode && hasNetworkConnection ? await loadUserPosts(userData.userId, true) : await loadUserPosts(userData.userId, false, true)
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

	const loadUserPosts = useCallback(async (userId?: string | null, refresh?: boolean, firstLoad?: boolean) => { // firstLoad foi adicionado para evitar da função pegar dados do contexto após o logout
		try {
			if (postListIsOver && !firstLoad && !refresh) return

			const postOwnerId = userId || userDataContext.userId

			const lastPost = !refresh && userPostsContext.length && !firstLoad ? getLastItem(userPostsContext) : undefined
			const queryKey = ['user.posts', postOwnerId, lastPost]
			let posts: PostEntity[] = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getPostsByOwner(usePostRepository, postOwnerId, 10, lastPost),
				refresh
			)
			posts = posts.map((p: PostEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!posts || (posts && !posts.length)
				|| (lastPost && posts && posts.length && (lastPost.postId === getLastItem(posts)?.postId))) {
				setPostListIsOver(true)
			}

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
			return mergeObjects(userPostsContext[0], userPostsContext[0].unapprovedData || {})
		} catch (error) {
			console.log(error)
			return {} as PostEntity
		}
	}

	const addUserPost = (postData: PostEntity) => {
		try {
			if (!postData) return
			userPostsContext.unshift(postData)
			setUserPosts(userPostsContext)
		} catch (error) {
			console.log(error)
		}
	}

	const updateUserPost = (postData: PostEntity | PostEntity[]) => {
		try {
			if (!postData) return

			let updatedUserPosts = userPostsContext

			if (Array.isArray(postData)) {
				postData.forEach((post) => {
					updatedUserPosts = updatedUserPosts.map((userPost) => (userPost.postId === post.postId ? post : userPost))
				})
			} else {
				updatedUserPosts = updatedUserPosts.map((userPost) => (userPost.postId === postData.postId ? postData : userPost))
			}

			setUserPosts(updatedUserPosts)
		} catch (error) {
			console.log(error)
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
		performQuickSignin,
		loadUserPosts,
		getLastUserPost,
		addUserPost,
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
