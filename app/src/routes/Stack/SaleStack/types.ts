import { DaysOfWeek, LatLong, LocationViewType, SaleCategories } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type SaleStackParamList = {
	SelectSaleCategory: { editMode: boolean } | undefined
	SelectSaleTags: { categorySelected: SaleCategories, editMode?: boolean }
	InsertSaleTitle: { editMode: boolean, initialValue: string } | undefined
	InsertItemDescription: { editMode: boolean, initialValue: string } | undefined
	InsertSalePicture: undefined
	SalePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectPaymentType: undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean, initialValue?: string }
	InsertExchangeValue: { editMode: boolean, initialValue: string } | undefined
	SelectLocationView: { editMode: boolean, initialValue?: LatLong } | undefined
	InsertSaleLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	LocationViewPreview: { editMode?: boolean, locationView: LocationViewType }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectSaleFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertOpeningHour: { editMode: boolean, initialValue: Date } | undefined
	InsertClosingHour: { editMode: boolean, initialValue: Date } | undefined
} & UserStackParamList
