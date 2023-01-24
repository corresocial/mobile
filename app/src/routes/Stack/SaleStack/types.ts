import { LocationViewType, SaleCategories } from '../../../services/firebase/types'

export type SaleStackParamList = {
	SelectSaleCategory: { editMode: boolean, initialValue: any } | undefined
	SelectSaleTags: { categorySelected: SaleCategories, editMode?: boolean, initialValue?: any }
	InsertSaleTitle: { editMode: boolean, initialValue: any } | undefined
	InsertItemDescription: { editMode: boolean, initialValue: any } | undefined
	InsertSalePicture: undefined
	SalePicturePreview: { editMode: boolean, initialValue: any } | undefined
	SelectPaymentType: undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean, initialValue?: any }
	InsertExchangeValue: { editMode: boolean, initialValue: any } | undefined
	InsertSaleLocation: { editMode?: boolean, initialValue?: any, locationView: LocationViewType }
	SelectLocationView: { editMode: boolean } | undefined
	LocationViewPreview: { editMode?: boolean, locationView: LocationViewType }
	SelectDeliveryMethod: { editMode: boolean, initialValue: any } | undefined
	SelectSaleFrequency: { editMode: boolean, initialValue: any } | undefined
	SelectDaysOfWeek: { editMode: boolean, initialValue: any } | undefined
	InsertOpeningHour: { editMode: boolean, initialValue: any } | undefined
	InsertClosingHour: { editMode: boolean, initialValue: any } | undefined
}
