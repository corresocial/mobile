import { addDays, getDay, format } from 'date-fns'

import { DateFnsAdapterInterface } from './DateAdapterInterface'

function DateFnsAdapter(): DateFnsAdapterInterface {
	return {
		addDays: (date: Date, days: number) => addDays(date, days),
		getDayOfWeek: (date: Date) => getDay(date),
		format: (date: Date, formatStr: string) => format(date, formatStr)
	}
}

export { DateFnsAdapter }
