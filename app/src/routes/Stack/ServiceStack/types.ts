import { LocationViewType, ServiceCategories } from '../../../services/firebase/types'

export type ServiceStackParamList = {
    SelectPostType: undefined
    InsertProfileDescription: undefined
    InsertServiceName: undefined
    InsertServicePicture: undefined
    ServicePicturePreview: undefined
    SelectServiceCategory: undefined
    SelectServiceTags: { categorySelected: ServiceCategories }
    SelectSaleOrExchange: undefined
    InsertExchangeValue: undefined
    InsertSaleValue: { bothPaymentType?: boolean }
    InsertServicePrestationLocation: undefined
    SelectLocationView: undefined
    LocationViewPreview: { locationView: LocationViewType }
    SelectDeliveryMethod: undefined
    SelectServiceFrequency: undefined
    SelectDaysOfWeek: undefined
    InsertOpeningHour: undefined
    InsertClosingHour: undefined
}
