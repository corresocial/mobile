import { MacroCategory, PostCollection } from '../services/firebase/types'

export interface UiUtilsInterface {
	textHasOnlyNumbers(text?: string | number): boolean
	formatDate(date: Date): string
	formatHour(date: Date): string
	formatRelativeDate(date: Date | number | string): string
	arrayIsEmpty(array: any): boolean
	sortArray(a: string, b: string): number
	sortPostCategories(a: MacroCategory, b: MacroCategory): number
	sortPostsByCreatedData(a: PostCollection, b: PostCollection): number
}
