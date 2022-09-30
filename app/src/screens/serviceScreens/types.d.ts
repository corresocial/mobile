import { serviceCategories } from "./serviceCategories";

export type ServiceCategories = keyof typeof serviceCategories

export type PaymentType = 'exchange' | 'sale' | 'any'