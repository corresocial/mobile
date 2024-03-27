import { LatLong, DaysOfWeek, LocationViewType, ServiceCategories, PostRange, IncomeEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type ServiceStackParamList = {
	SelectServicePurpose: { editMode: boolean } | undefined
	InsertServiceDescription: { editMode: boolean, initialValue: string } | undefined
	InsertIncomeLinks: { editMode: boolean, initialValue: string[] } | undefined
	ServicePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectServiceCategory: { editMode: boolean } | undefined
	SelectServiceTags: { categorySelected: ServiceCategories, editMode?: boolean }
	SelectPaymentType: { editMode: boolean } | undefined
	SelectSaleValueType: { bothPaymentType: boolean, editMode?: boolean }
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean }
	InsertExchangeValue: { editMode: boolean } | undefined
	SelectServiceRange: { editMode: boolean } | undefined
	SelectLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	InsertServicePrestationLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	ServiceLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectServiceFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectServiceDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertServiceStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertServiceEndHour: { editMode: boolean, initialValue: Date } | undefined
	EditServicePostReview: { postData: IncomeEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
} & UserStackParamList
