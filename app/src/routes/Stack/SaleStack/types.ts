import { SaleCategories } from "../../../screens/saleScreens/types"

export type SaleStackParamList = {
    SelectSaleCategory: undefined
    SelectSaleTags: {categorySelected: SaleCategories}
    InsertSaleTitle: undefined
}