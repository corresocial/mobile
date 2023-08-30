import { DaysOfWeek, LatLong, LocationViewType, PostRange, VacancyCategories, VacancyCollectionRemote } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type VacancyStackParamList = {
	SelectVacancyPurpose: { editMode: boolean } | undefined
	SelectVacancyCategory: { editMode: boolean } | undefined
	SelectVacancyTags: { categorySelected: VacancyCategories, editMode?: boolean }
	InsertVacancyTitle: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyDescription: { editMode: boolean, initialValue: string } | undefined
	InsertVacancyImportantPoints: { editMode: boolean, initialValue: string[] } | undefined
	VacancyPicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectWorkplace: { editMode: boolean } | undefined
	SelectPaymentType: { editMode: boolean } | undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean }
	InsertExchangeValue: { editMode: boolean } | undefined
	SelectSaleValueType: { bothPaymentType: boolean, editMode?: boolean }
	SelectVacancyRange: { editMode?: boolean } | undefined
	SelectVacancyLocationView: { editMode?: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	VacancyLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	InsertWorkplaceLocation: { editMode?: boolean, locationView: LocationViewType, initialValue?: LatLong }
	SelectVacancyFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectVacancyType: { editMode: boolean } | undefined
	SelectWorkWeekdays: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertVacancyStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyEndHour: { editMode: boolean, initialValue: Date } | undefined
	EditVacancyPostReview: { postData: VacancyCollectionRemote, unsavedPost?: boolean, showPresentationModal?: boolean }
} & UserStackParamList
