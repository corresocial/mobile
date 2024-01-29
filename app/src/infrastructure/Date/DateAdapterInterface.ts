interface DateFnsAdapterInterface {
	addDays: (date: Date, days: number) => Date
	getDayOfWeek: (date: Date) => number
	format: (date: Date, formatStr: string) => string
}

export { DateFnsAdapterInterface }
