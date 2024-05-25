import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { LeaderAreaContextType, LeaderAreaProviderProps } from './types'

import { getNewDate } from '@utils-ui/common/date/dateFormat'

const { executeCachedRequest } = useCacheRepository()

const { getUnapprovedPosts } = usePostDomain()

const initialValue: LeaderAreaContextType = {
	unapprovedPosts: [] as PostEntity[],
	removeFromUnapprovedPostList: (data?: PostEntity) => { },
	loadUnapprovedPosts: (refresh?: boolean) => Promise.resolve()
}

const LeaderAreaContext = createContext<LeaderAreaContextType>(initialValue)

function LeaderAreaProvider({ children }: LeaderAreaProviderProps) {
	const { setLoaderIsVisible } = useLoaderContext()
	const { userDataContext } = useAuthContext()

	const [unapprovedListIsOver, setUnapprovedListIsOver] = useState(false)
	const [unapprovedPosts, setUnapprovedPosts] = useState(initialValue.unapprovedPosts)

	const queryClient = useQueryClient()

	useEffect(() => {
		loadUnapprovedPosts()
	}, [])

	const loadUnapprovedPosts = useCallback(async (refresh?: boolean) => {
		try {
			if (unapprovedListIsOver && !refresh) return
			!refresh && setLoaderIsVisible(true)

			// TODO Criar utilitário para pegar o último item de um array POST/POLLS/PETITIONS
			const lastPost = !refresh && (unapprovedPosts && unapprovedPosts.length) ? unapprovedPosts[unapprovedPosts.length - 1] : undefined

			const queryKey = ['unapprovedPosts', userDataContext.userId, lastPost]
			let posts = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getUnapprovedPosts(usePostRepository, 5, lastPost),
				refresh
			)

			posts = posts.map((p: PostEntity) => ({ ...p, updatedAt: getNewDate(p.updatedAt) }))

			if (!posts || (posts && !posts.length)) {
				!refresh && setLoaderIsVisible(false)
				setUnapprovedListIsOver(true)
				return
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['unapprovedPosts', userDataContext.userId] })
				setUnapprovedListIsOver(false)
				setUnapprovedPosts([...posts])
			} else {
				setUnapprovedPosts([...unapprovedPosts, ...posts])
			}

			!refresh && setLoaderIsVisible(false)
		} catch (error) {
			console.log(error)
			!refresh && setLoaderIsVisible(false)
		}
	}, [unapprovedPosts, unapprovedListIsOver])

	const removeFromUnapprovedPostList = useCallback((data?: PostEntity) => {
		if (!data) return
		const filteredList = unapprovedPosts.filter((post) => post.postId !== data.postId)
		setUnapprovedPosts(filteredList)
	}, [unapprovedPosts])

	const leaderAreaProviderData = useMemo(() => ({
		unapprovedPosts,
		removeFromUnapprovedPostList,
		loadUnapprovedPosts,
	}), [unapprovedPosts])

	return (
		<LeaderAreaContext.Provider value={leaderAreaProviderData}>
			{children}
		</LeaderAreaContext.Provider>
	)
}

const useLeaderAreaContext = () => useContext(LeaderAreaContext)

export { LeaderAreaProvider, useLeaderAreaContext }
