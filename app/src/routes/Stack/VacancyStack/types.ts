import { DaysOfWeek, LatLong, LocationViewType, VacancyCategories } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type VacancyStackParamList = {
	InsertVacancyTitle: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyDescription: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyQuestions: undefined
	InsertCompanyDescription: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyPicture: undefined
	VacancyPicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectWorkplace: { editMode: boolean } | undefined
	SelectPaymentType: { editMode: boolean } | undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean, initialValue?: string }
	InsertExchangeValue: { editMode: boolean, initialValue: string } | undefined
	SelectSaleValueType: { bothPaymentType: boolean }
	SelectVacancyRange: undefined
	SelectVacancyLocationView: { editMode?: boolean, locationView: LocationViewType, initialValue?: LatLong } | undefined
	VacancyLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	InsertWorkplaceLocation: { editMode?: boolean, locationView: LocationViewType, initialValue?: LatLong }
	SelectVacancyFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectVacancyCategory: { editMode: boolean } | undefined
	SelectVacancyTags: { categorySelected: VacancyCategories, editMode?: boolean }
	SelectVacancyType: { editMode: boolean } | undefined
	SelectWorkWeekdays: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertVacancyStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyEndHour: { editMode: boolean, initialValue: Date } | undefined
	VacancyReview: undefined
} & UserStackParamList
