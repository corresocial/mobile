import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'

import { UserEntity } from '../entity/types'

import { AlgoliaServiceInterface } from '../provider/AlgoliaServiceInterface'

type Input = { searchText: string, pageNumber?: number }
type Output = Promise<{ profiles: UserEntity[], totalHits: number }>

export class SearchProfile implements UseCase<Input, Output> {
	private algoliaService: AlgoliaServiceInterface

	constructor(AlgoliaService: Class<AlgoliaServiceInterface>) {
		this.algoliaService = new AlgoliaService()
	}

	async exec({ searchText, pageNumber }: Input): Output { // TEST
		return this.algoliaService.searchProfileByText(searchText, pageNumber) || { profiles: [], totalHits: 0 }
	}
}
