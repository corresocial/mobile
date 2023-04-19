import { DaysOfWeek, ItemStatus, LatLong, LocationViewType, SaleCategories } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type SaleStackParamList = {
	SelectSaleCategory: { editMode: boolean } | undefined
	SelectSaleTags: { categorySelected: SaleCategories, editMode?: boolean }
	SelectItemStatus: { editMode: boolean, initialValue: ItemStatus } | undefined
	InsertSaleTitle: { editMode: boolean, initialValue: string } | undefined
	InsertItemDescription: { editMode: boolean, initialValue: string } | undefined
	InsertSalePicture: undefined
	SalePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectPaymentType: undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean, initialValue?: string }
	SelectSaleValueType: { bothPaymentType: boolean, editMode?: boolean, initialValue?: string }
	InsertExchangeValue: { editMode: boolean, initialValue: string } | undefined
	SelectSaleRange: undefined
	SelectLocationView: { editMode: boolean, initialValue?: LatLong } | undefined
	InsertSaleLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	SaleLocationViewPreview: { editMode?: boolean, locationView: LocationViewType }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectSaleFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSaleDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertSaleStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertSaleEndHour: { editMode: boolean, initialValue: Date } | undefined
} & UserStackParamList
