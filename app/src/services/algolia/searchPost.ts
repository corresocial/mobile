/* eslint-disable no-underscore-dangle */
import { servicesIndex, salesIndex } from './index'

import { PostCollectionType } from '../firebase/types'
import { PostIdentification } from './types'

async function searchPosts(searchText: string, postsIdentification: any, tagName: string) {
	try {
		const resultsGroup = await searchAllPosts(searchText, postsIdentification, tagName)

		if (resultsGroup.length > 0) {
			const posts = resultsGroup[0].hits.map((record: any, index: number) => {
				const postData = structurePostObject(record)
				return postData
			})
			return posts
		}
		return [] as PostIdentification[]
	} catch (err) {
		console.log(err)
		console.log('Erro ao buscar posts no algolia, file:searchPosts')
		return []
	}
}

const searchAllPosts = (searchText: string, postsIdentification: PostIdentification[], tagName: string) => {
	const allPosts = postsIdentification.map(async (post) => {
		const postIndex = getRelativeAlgoliaIndex(post.collection as PostCollectionType)
		const filterIds = getPostIdsFilter(post.postIds)
		const filterTag = `tags:${tagName}`

		const results = await postIndex.search(searchText, {
			filters: `${filterIds} AND ${filterTag}`
		})

		return results
	})

	return Promise.all(allPosts)
}

const structurePostObject = (record: any) => {
	const structuredPost = {
		...record,
		postId: record.objectID,
		owner: {
			name: record['owner.name'],
			profilePictureUrl: record['owner.profilePictureUrl'],
			userId: record['owner.userId'],
		}
	}
	delete structuredPost.path
	delete structuredPost.objectID
	delete structuredPost.lastmodified
	delete structuredPost._highlightResult
	delete structuredPost['owner.name']
	delete structuredPost['owner.profilePictureUrl']
	delete structuredPost['owner.userId']

	return structuredPost
}

const getRelativeAlgoliaIndex = (collection: PostCollectionType) => {
	switch (collection) {
		case 'services': return servicesIndex
		case 'sales': return salesIndex
		default: throw new Error('Não foi possível definir o index do post')
	}
}

const getPostIdsFilter = (postIds: string[]) => {
	return postIds.reduce((query, postId) => {
		if (postId === postIds[postIds.length - 1]) {
			return `${query} objectID:${postId}`
		}
		return `${query} objectID:${postId} OR`
	}, '')
}

export { searchPosts }
