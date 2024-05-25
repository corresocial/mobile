import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { PostEntity } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { usePostRepository } from '@data/post/usePostRepository'

import { LeaderAreaContextType, LeaderAreaProviderProps } from './types'

const { getUnapprovedPosts } = usePostDomain()

const initialValue: LeaderAreaContextType = {
	unapprovedPosts: [] as PostEntity[],
	removeFromUnapprovedPostList: (data?: PostEntity) => { },
	loadUnapprovedPosts: () => Promise.resolve()
}

const LeaderAreaContext = createContext<LeaderAreaContextType>(initialValue)

function LeaderAreaProvider({ children }: LeaderAreaProviderProps) {
	const [unapprovedPosts, setUnapprovedPosts] = useState(initialValue.unapprovedPosts)

	useEffect(() => {
		console.log('effect')
		loadUnapprovedPosts()
	}, [])

	const loadUnapprovedPosts = async () => {
		console.log('effect loadUnapprovedPosts')
		const posts = await getUnapprovedPosts(usePostRepository, 2)
		setUnapprovedPosts(posts || [])
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
