export interface UiUtilsInterface {
	textHasOnlyNumbers(text?: string | number): boolean
	convertTextToNumber(text: string): number | null
	formatDate(date: Date): string
	formatHour(date: Date): string
	formatRelativeDate(date: Date | number | string): string
	arrayIsEmpty(array: any): boolean
	sortArray(a: string, b: string): number

	validateRG(rg: string): boolean
	validateCPF(cpf: string): boolean
}
