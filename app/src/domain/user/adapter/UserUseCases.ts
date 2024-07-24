import { Class } from '@domain/shared/interfaces/Class'

import { AlgoliaService } from '@services/algolia/AlgoliaService'

import { AlgoliaServiceInterface } from '../provider/AlgoliaServiceInterface'
import { SearchProfile } from '../useCases/SearchProfile'

interface UserUseCasesProps {
	algoliaService: Class<AlgoliaServiceInterface>
}

export class UserUseCases {
	private algoliaService: Class<AlgoliaServiceInterface>

	constructor(props?: UserUseCasesProps) {
		this.algoliaService = props?.algoliaService || AlgoliaService
	}

	searchProfile(searchText: string, pageNumber: number) {
		return new SearchProfile(this.algoliaService).exec({ searchText, pageNumber })
	}
}
