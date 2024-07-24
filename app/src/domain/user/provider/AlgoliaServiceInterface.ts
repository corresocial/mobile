import { UserEntity } from '@domain/user/entity/types'

interface AlgoliaServiceInterface {
	searchProfileByText(text: string, pageNumber?: number): Promise<{ profiles: UserEntity[], totalHits: number }>
}

export { AlgoliaServiceInterface }
