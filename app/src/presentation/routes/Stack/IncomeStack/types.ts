import { DaysOfWeek, LatLong, LocationViewType, PostRange, SaleCategories, IncomeEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type IncomeStackParamList = {
	InsertIncomeDescription: { editMode: boolean, initialValue: string } | undefined
	SelectPostPicture: { editMode: boolean, initialValue: { picturesUrl: string[], videosUrl: string[] } } | undefined
	SelectSaleLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }

	SelectSaleCategory: { editMode: boolean } | undefined
	SelectSaleTags: { categorySelected: SaleCategories, editMode?: boolean }
	SelectItemStatus: { editMode: boolean } | undefined
	InsertIncomeLinks: { editMode: boolean, initialValue: string[] } | undefined
	SelectPaymentType: { editMode: boolean } | undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean }
	SelectSaleValueType: { bothPaymentType: boolean, editMode?: boolean }
	InsertExchangeValue: { editMode: boolean } | undefined
	SelectLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	SelectSaleRange: { editMode: boolean } | undefined
	SaleLocationViewPreview: { editMode?: boolean, locationView: LocationViewType }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectSaleFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSaleDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertSaleStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertSaleEndHour: { editMode: boolean, initialValue: Date } | undefined
	EditSalePostReview: { postData: IncomeEntity, approvedPostData: IncomeEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
} & UserStackParamList
