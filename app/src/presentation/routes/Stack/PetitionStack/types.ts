import { PetitionEntity } from '@domain/petition/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type PetitionStackParamList = {
	InsertPetitionTitle: { editMode: boolean, initialValue: string } | undefined
	InsertPetitionDescription: { editMode: boolean, initialValue: string } | undefined
	SelectIdentificationRequest: { editMode: boolean } | undefined
	SelectPetitionMedia: { editMode: boolean, initialValue: { picturesUrl: string[], videosUrl: string[] } } | undefined
	SelectPetitionRange: { editMode: boolean } | undefined
	InsertPetitionLocation: { editMode: boolean, initialValue: PetitionEntity['location'] } | undefined

	PetitionReview: { petitionData: PetitionEntity, unsavedPetition: boolean }
} & UserStackParamList
