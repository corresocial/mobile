/* eslint-disable no-underscore-dangle */
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch'

import { UserEntity } from '@domain/user/entity/types'

import { getEnvVars } from '@infrastructure/environment'

import { AlgoliaServiceInterface } from '../../domain/user/provider/AlgoliaServiceInterface'

const { ALGOLIA_ID, ALGOLIA_KEY } = getEnvVars()

type Record = {
	readonly objectID?: string
	readonly lastmodified?: string
	readonly path?: string
	readonly _highlightResult?: {} | undefined
	readonly _snippetResult?: {} | undefined
	readonly _rankingInfo?: any
	readonly _distinctSeqID?: number | undefined
}

export class AlgoliaService implements AlgoliaServiceInterface {
	algoliaClient: SearchClient

	constructor() {
		const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY)
		this.algoliaClient = client
	}

	private removeAlgoliaExtraData(record: Record, identificator: string) {
		const structuredPost = {
			...record,
			[identificator]: record.objectID,
		}
		delete structuredPost.path
		delete structuredPost.objectID
		delete structuredPost.lastmodified
		delete structuredPost._highlightResult
		return structuredPost
	}

	async searchProfileByText(text: string, page: number = 0): Promise<{ profiles: UserEntity[], totalHits: number }> {
		const postsIndex: SearchIndex = this.algoliaClient.initIndex('usersIndex')

		const results = await postsIndex.search<UserEntity>(text, { page: page, hitsPerPage: 10 })

		const profiles = results.hits.reduce((acc: UserEntity[] | any, result: any) => {
			const structuredData = this.removeAlgoliaExtraData(result, 'userId')
			return [...acc, structuredData]
		}, [] as UserEntity[])

		return {
			profiles,
			totalHits: results.nbHits
		}
	}
}
