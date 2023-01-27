import { DaysOfWeek, Id, VacancyCategories, WorkplaceType } from '../../../services/firebase/types'

export type VacancyStackParamList = {
	InsertVacancyTitle: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyDescription: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyQuestions: undefined
	InsertCompanyDescription: { editMode: boolean, initialValue: string } | undefined
	SelectWorkplace: { editMode: boolean } | undefined
	InsertWorkplaceLocation: { workplace: WorkplaceType, editMode?: boolean, initialValue?: Id }
	SelectVacancyCategory: { editMode: boolean } | undefined
	SelectVacancyTags: { categorySelected: VacancyCategories, editMode?: boolean }
	SelectVacancyType: { editMode: boolean } | undefined
	SelectWorkWeekdays: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertWorkStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertWorkEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertWorkStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertWorkEndHour: { editMode: boolean, initialValue: Date } | undefined
}
