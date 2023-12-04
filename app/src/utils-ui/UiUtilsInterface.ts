export interface UiUtilsInterface {
	textHasOnlyNumbers(text?: string | number): boolean
	formatDate(date: Date): string
	formatHour(date: Date): string
	formatRelativeDate(date: Date | number | string): string
	arrayIsEmpty(array: any): boolean
	sortArray(a: string, b: string): number
}
