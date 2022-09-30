import { ServiceCategories } from "../../../screens/saleScreens/types"

export type ServiceStackParamList = {
    SelectPostType: undefined
    InsertProfileDescription: undefined
    InsertServiceName: undefined
    InsertServicePicture: undefined
    ServicePicturePreview: undefined
    SelectServiceCategory: undefined
    SelectServiceTags: {categorySelected: ServiceCategories}
    SelectSaleOrExchange: undefined
}