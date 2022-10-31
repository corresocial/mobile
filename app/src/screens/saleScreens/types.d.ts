
import {saleCategories} from './saleCategories'

export type SaleCategories = keyof typeof saleCategories

export type SaleCategory = {
    label: string
    value: string
    tags: string[]
}