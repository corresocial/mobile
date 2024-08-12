import { DaysOfWeek, LatLong, LocationViewType, PostRange, PostCategoriesType, IncomeEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type IncomeStackParamList = {
	InsertIncomeDescription: { editMode: boolean, initialValue: string } | undefined
	SelectPostPicture: { editMode: boolean, initialValue: { picturesUrl: string[], videosUrl: string[] } } | undefined
	SelectIncomeLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	EditIncomePostReview: { postData: IncomeEntity, approvedPostData: IncomeEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
	IncomePostReview: { postData: IncomeEntity, approvedPostData: IncomeEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }

	SelectIncomeCategory: { editMode: boolean } | undefined
	SelectIncomeType: { editMode: boolean } | undefined
	SelectIncomeTags: { categorySelected: PostCategoriesType, editMode?: boolean }
	SelectItemStatus: { editMode: boolean } | undefined
	InsertIncomeLinks: { editMode: boolean, initialValue: string[] } | undefined
	SelectPaymentType: { editMode: boolean } | undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean }
	SelectSaleValueType: { bothPaymentType: boolean, editMode?: boolean }
	InsertExchangeValue: { editMode: boolean } | undefined
	SelectLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	SelectIncomeRange: { editMode: boolean } | undefined
	IncomeLocationViewPreview: { editMode?: boolean, locationView: LocationViewType }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectIncomeFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectIncomeDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertIncomeStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertIncomeEndHour: { editMode: boolean, initialValue: Date } | undefined

	InsertVacancyImportantPoints: { editMode: boolean, initialValue: string[] } | undefined
	InsertVacancyStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertVacancyEndDate: { editMode: boolean, initialValue: Date } | undefined
	SelectWorkplace: { editMode: boolean } | undefined
	SelectVacancyType: { editMode: boolean } | undefined
} & UserStackParamList
