import { UserStackParamList } from '../UserStack/types'

export type PetitionStackParamList = {
	InsertPetitionTitle: { editMode: boolean, initialValue: string } | undefined
} & UserStackParamList
