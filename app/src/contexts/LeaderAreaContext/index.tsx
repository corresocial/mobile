import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'
import { usePostRepository } from '@data/post/usePostRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { LeaderAreaContextType, LeaderAreaProviderProps } from './types'

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
		console.log('effect')
		loadUnapprovedPosts()
	}, [])

	const loadUnapprovedPosts = async (refresh?: boolean) => {
		try {
			if (unapprovedListIsOver && !refresh) return

			refresh && setLoaderIsVisible(true)

			// TODO Criar utilitário para pegar o último item de um array
			const lastPost = !refresh && (unapprovedPosts && unapprovedPosts.length) ? unapprovedPosts[unapprovedPosts.length - 1] : undefined

			/* const queryKey = ['unapprovedPosts', userDataContext.userId, lastPost]
			const posts = await executeCachedRequest(
				queryClient,
				queryKey,
				() => getUnapprovedPosts(usePostRepository, 2, lastPost),
				refresh
			) */

			const posts = await getUnapprovedPosts(usePostRepository, 2, lastPost)

			if (!posts || (posts && !posts.length)) {
				refresh && setLoaderIsVisible(false)
				setUnapprovedListIsOver(true)
				return
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['unapprovedPosts', userDataContext.userId] })
				setUnapprovedPosts([...posts])
				setUnapprovedListIsOver(false)
			} else {
				setUnapprovedPosts([...unapprovedPosts, ...posts])
			}

			refresh && setLoaderIsVisible(false)
		} catch (error) {
			console.log(error)
			refresh && setLoaderIsVisible(false)
		}
	}

	const removeFromUnapprovedPostList = async (data?: PostEntity) => {
		if (!data) return
		const filteredList = unapprovedPosts.filter((post) => post.postId !== data.postId)
		setUnapprovedPosts(filteredList)
	}

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
