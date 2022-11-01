import { LocationViewType, SaleCategories } from "../../../screens/saleScreens/types"

export type SaleStackParamList = {
    SelectSaleCategory: undefined
    SelectSaleTags: { categorySelected: SaleCategories }
    InsertSaleTitle: undefined
    InsertItemName: undefined
    InsertItemDescription: undefined
    InsertSalePicture: undefined
    SalePicturePreview: undefined
    SelectPaymentType: undefined
    InsertSaleValue: { bothPaymentType?: boolean }
    InsertExchangeValue: undefined
    InsertSaleLocation: undefined
    SelectLocationView: undefined
    LocationViewPreview: { locationView?: LocationViewType }
    SelectDeliveryMethod: undefined
    SelectSaleFrequency: undefined
}