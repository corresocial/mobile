import { VacancyCategories, WorkplaceType } from '../../../services/firebase/types'

export type VacancyStackParamList = {
	InsertVacancyTitle: { editMode: boolean, initialValue: any } | undefined
	InsertVacancyDescription: { editMode: boolean, initialValue: any } | undefined
	InsertVacancyQuestions: undefined
	InsertCompanyDescription: { editMode: boolean, initialValue: any } | undefined
	SelectWorkplace: { editMode: boolean } | undefined
	InsertWorkplaceLocation: { workplace: WorkplaceType, editMode?: boolean, initialValue?: any }
	SelectVacancyCategory: { editMode: boolean } | undefined
	SelectVacancyTags: { categorySelected: VacancyCategories, editMode?: boolean }
	SelectVacancyType: { editMode: boolean } | undefined
	SelectWorkWeekdays: { editMode: boolean, initialValue: any } | undefined
	InsertWorkStartHour: { editMode: boolean, initialValue: any } | undefined
	InsertWorkEndHour: { editMode: boolean, initialValue: any } | undefined
	InsertWorkStartDate: { editMode: boolean, initialValue: any } | undefined
	InsertWorkEndDate: { editMode: boolean, initialValue: any } | undefined
}
