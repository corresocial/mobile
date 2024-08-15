import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useUtils } from '@newutils/useUtils'
import { useQueryClient } from '@tanstack/react-query'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { UserEntity } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { LeaderAreaContextType, LeaderAreaProviderProps } from './types'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

const { executeCachedRequest } = useCacheRepository()

const { getUnapprovedPosts } = usePostDomain()
const { getUnapprovedProfiles } = useUserDomain()

const { getLastItem } = useUtils()

const initialValue: LeaderAreaContextType = {
	unapprovedProfiles: [] as UserEntity[],
	unapprovedPosts: [] as PostEntity[],
	loadUnapprovedProfiles: (refresh?: boolean) => Promise.resolve(),
	loadUnapprovedPosts: (refresh?: boolean) => Promise.resolve(),
	removeFromUnapprovedProfileList: (data?: UserEntity) => { },
	removeFromUnapprovedPostList: (data?: PostEntity) => { },
}

const LeaderAreaContext = createContext<LeaderAreaContextType>(initialValue)

function LeaderAreaProvider({ children }: LeaderAreaProviderProps) {
	const { setLoaderIsVisible } = useLoaderContext()
	const { userDataContext } = useAuthContext()

	const [unapprovedProfiles, setUnapprovedProfiles] = useState(initialValue.unapprovedProfiles)
	const [unapprovedPosts, setUnapprovedPosts] = useState(initialValue.unapprovedPosts)
	const [unapprovedPostListIsOver, setUnapprovedPostListIsOver] = useState(false)
	const [unapprovedProfileListIsOver, setUnapprovedProfileListIsOver] = useState(false)

	const queryClient = useQueryClient()

	useEffect(() => {
		loadUnapprovedPosts()
		loadUnapprovedProfiles()
	}, [])

	const loadUnapprovedProfiles = useCallback(async (refresh?: boolean) => {
		try {
			if (unapprovedProfileListIsOver && !refresh) return
			!refresh && setLoaderIsVisible(true)

			const lastProfile = !refresh && (unapprovedProfiles.length) ? unapprovedProfiles[unapprovedProfiles.length - 1] : undefined

			const queryKey = ['users.unapproved', userDataContext.userId, lastProfile]
			let profiles = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getUnapprovedProfiles(useUserRepository, 5, lastProfile),
				refresh
			)

			profiles = profiles.map((p: UserEntity) => ({ ...p, updatedAt: getNewDate(p.updatedAt || p.createdAt) }))

			if (
				!profiles || (profiles && !profiles.length)
				|| (lastProfile && profiles && profiles.length && (lastProfile.userId === profiles[profiles.length - 1].userId))
			) {
				!refresh && setLoaderIsVisible(false)
				return setUnapprovedProfileListIsOver(true)
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['users.unapproved', userDataContext.userId] })
				setUnapprovedProfileListIsOver(false)
				setUnapprovedProfiles([...profiles])
			} else {
				setUnapprovedProfiles([...unapprovedProfiles, ...profiles])
			}

			!refresh && setLoaderIsVisible(false)
		} catch (error) {
			console.log(error)
			!refresh && setLoaderIsVisible(false)
		}
	}, [unapprovedProfiles, unapprovedProfileListIsOver])

	const loadUnapprovedPosts = useCallback(async (refresh?: boolean) => {
		try {
			if (unapprovedPostListIsOver && !refresh) return
			!refresh && setLoaderIsVisible(true)

			const lastPost = !refresh && (unapprovedPosts.length) ? getLastItem(unapprovedPosts) : undefined

			const queryKey = ['posts.unapproved', userDataContext.userId, lastPost]
			let posts: PostEntity[] = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getUnapprovedPosts(usePostRepository, 10, lastPost),
				refresh
			)

			posts = posts.map((p: PostEntity) => ({ ...p, updatedAt: getNewDate(p.updatedAt || p.createdAt) }))
			console.log(posts.map((p) => p.postId))

			if (
				!posts || (posts && !posts.length)
				|| (lastPost && posts && posts.length && (lastPost.postId === getLastItem(posts)?.postId))
			) {
				!refresh && setLoaderIsVisible(false)
				return setUnapprovedPostListIsOver(true)
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['posts.unapproved', userDataContext.userId] })
				setUnapprovedPostListIsOver(false)
				setUnapprovedPosts([...posts])
			} else {
				setUnapprovedPosts([...unapprovedPosts, ...posts])
			}

			!refresh && setLoaderIsVisible(false)
		} catch (error) {
			console.log(error)
			!refresh && setLoaderIsVisible(false)
		}
	}, [unapprovedPosts, unapprovedPostListIsOver])

	const removeFromUnapprovedPostList = useCallback((data?: PostEntity) => {
		if (!data) return
		const filteredList = unapprovedPosts.filter((post) => post.postId !== data.postId)
		setUnapprovedPosts(filteredList)
	}, [unapprovedPosts])

	const removeFromUnapprovedProfileList = useCallback((data?: UserEntity) => {
		if (!data) return
		const filteredList = unapprovedProfiles.filter((profile) => profile.userId !== data.userId)
		setUnapprovedProfiles(filteredList)
	}, [unapprovedProfiles])

	const leaderAreaProviderData = useMemo(() => ({
		unapprovedProfiles,
		unapprovedPosts,
		loadUnapprovedProfiles,
		loadUnapprovedPosts,
		removeFromUnapprovedProfileList,
		removeFromUnapprovedPostList
	}), [unapprovedPosts, unapprovedProfiles, unapprovedPostListIsOver])

	return (
		<LeaderAreaContext.Provider value={leaderAreaProviderData}>
			{children}
		</LeaderAreaContext.Provider>
	)
}

const useLeaderAreaContext = () => useContext(LeaderAreaContext)

export { LeaderAreaProvider, useLeaderAreaContext }
