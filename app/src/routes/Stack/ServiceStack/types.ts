import { DaysOfWeek, Id, LocationViewType, ServiceCategories } from '../../../services/firebase/types'

export type ServiceStackParamList = {
	InsertServiceDescription: { editMode: boolean, initialValue: string } | undefined
	InsertServiceName: { editMode: boolean, initialValue: string } | undefined
	InsertServicePicture: undefined
	ServicePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectServiceCategory: { editMode: boolean } | undefined
	SelectServiceTags: { categorySelected: ServiceCategories, editMode?: boolean }
	SelectSaleOrExchange: undefined
	InsertExchangeValue: { editMode: boolean, initialValue: string } | undefined
	InsertSaleValue: { bothPaymentType: boolean, editMode?: boolean, initialValue?: string }
	SelectLocationView: { editMode: boolean, initialValue?: LocationViewType } | undefined
	InsertServicePrestationLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: Id }
	LocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectDeliveryMethod: { editMode: boolean } | undefined
	SelectServiceFrequency: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	InsertOpeningHour: { editMode: boolean, initialValue: Date } | undefined
	InsertClosingHour: { editMode: boolean, initialValue: Date } | undefined
}
