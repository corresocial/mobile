import { DaysOfWeek, LatLong, LocationViewType, PostRange, SaleCategories } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type SaleStackParamList = {
	SelectSaleCategory: { editMode: boolean } | undefined
	SelectSaleTags: { categorySelected: SaleCategories, editMode?: boolean }
	SelectItemStatus: { editMode: boolean } | undefined
	InsertSaleTitle: { editMode: boolean, initialValue: string } | undefined
	InsertItemDescription: { editMode: boolean, initialValue: string } | undefined
	InsertSalePicture: undefined
	SalePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectPaymentType: { editMode: boolean } | undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean }
	SelectSaleValueType: { bothPaymentType: boolean, editMode?: boolean }
	InsertExchangeValue: { editMode: boolean } | undefined
	SelectSaleRange: { editMode: boolean } | undefined
	SelectLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	InsertSaleLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	SaleLocationViewPreview: { editMode?: boolean, locationView: LocationViewType }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectSaleFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSaleDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertSaleStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertSaleEndHour: { editMode: boolean, initialValue: Date } | undefined
	SaleReview: undefined
} & UserStackParamList
