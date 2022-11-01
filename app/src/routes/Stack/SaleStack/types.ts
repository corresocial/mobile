import { SaleCategories } from "../../../screens/saleScreens/types"

export type SaleStackParamList = {
    SelectSaleCategory: undefined
    SelectSaleTags: {categorySelected: SaleCategories}
    InsertSaleTitle: undefined
    InsertItemName: undefined
    InsertItemDescription: undefined
    InsertSalePicture: undefined
    SalePicturePreview: undefined
    SelectPaymentType: undefined
}