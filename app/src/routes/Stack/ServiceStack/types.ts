import { LocationViewType, ServiceCategories } from '../../../services/firebase/types'

export type ServiceStackParamList = {
	SelectPostType: undefined
	InsertServiceDescription: { editMode: boolean, initialValue: any } | undefined
	InsertServiceName: { editMode: boolean, initialValue: any } | undefined
	InsertServicePicture: { editMode: boolean, initialValue: any } | undefined
	ServicePicturePreview: { editMode: boolean, initialValue: any } | undefined
	SelectServiceCategory: { editMode: boolean, initialValue: any } | undefined
	SelectServiceTags: { categorySelected: ServiceCategories, editMode?: boolean, initialValue?: any }
	SelectSaleOrExchange: { editMode: boolean, initialValue: any } | undefined
	InsertExchangeValue: { editMode: boolean, initialValue: any } | undefined
	InsertSaleValue: { editMode: boolean, initialValue: any, bothPaymentType?: boolean }
	InsertServicePrestationLocation: { editMode?: boolean, initialValue?: any, locationView: LocationViewType }
	SelectLocationView: { editMode: boolean } | undefined
	LocationViewPreview: { editMode?: boolean, locationView: LocationViewType } | undefined
	SelectDeliveryMethod: { editMode: boolean, initialValue: any } | undefined
	SelectServiceFrequency: { editMode: boolean, initialValue: any } | undefined
	SelectDaysOfWeek: { editMode: boolean, initialValue: any } | undefined
	InsertOpeningHour: { editMode: boolean, initialValue: any } | undefined
	InsertClosingHour: { editMode: boolean, initialValue: any } | undefined
}
