/* eslint-disable no-underscore-dangle */
import { searchClient, SearchClient, SearchResult } from 'algoliasearch'

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
		const client = searchClient(ALGOLIA_ID, ALGOLIA_KEY)
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
		const results = await this.algoliaClient.search<UserEntity>({
			requests: [
				{
					query: text,
					indexName: 'usersIndex',
					page: page,
					hitsPerPage: 10
				}
			]
		})

		// Tipagem da lib está errada, results.hits existe, mas a tipagem não consta
		const profiles = (results.results[0] as any).hits.reduce((acc: UserEntity[] | any, result: SearchResult<UserEntity>) => {
			const structuredData = this.removeAlgoliaExtraData(result as any, 'userId')
			return [...acc, structuredData]
		}, [] as UserEntity[])

		return {
			profiles,
			totalHits: (results.results || []).length
		}
	}
}
