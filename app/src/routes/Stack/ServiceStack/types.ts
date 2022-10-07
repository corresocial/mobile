import { LocationViewType, PaymentType, ServiceCategories } from "../../../screens/serviceScreens/types"

export type ServiceStackParamList = {
    SelectPostType: undefined
    InsertProfileDescription: undefined
    InsertServiceName: undefined
    InsertServicePicture: undefined
    ServicePicturePreview: undefined
    SelectServiceCategory: undefined
    SelectServiceTags: {categorySelected: ServiceCategories}
    SelectSaleOrExchange: undefined
    InsertExchangeValue: undefined
    InsertSaleValue: {anyPaymentType?: boolean}
    InsertServicePrestationLocation: undefined
    SelectLocationView: undefined
    LocationViewPreview: {locationView: LocationViewType}
    SelectDeliveryMethod: undefined
    SelectServiceFrequency: undefined
}