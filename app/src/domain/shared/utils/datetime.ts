import { formatDistance, formatRelative, isValid, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }

const getNewDate = (date: any) => {
	if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
		const { _seconds, seconds } = date as DateFirestore

		if (seconds) {
			return new Date(seconds * 1000)
		}
		return new Date(_seconds * 1000)
	}
	return new Date(date)
}

const formatDate = (dateValue: Date) => {
	if (!dateValue) return ''

	const date = getNewDate(dateValue)
	if (!isValid(date)) return ''
	return format(date, 'dd/MM/yyyy', { locale: ptBR })
}

const formatHour = (dateValue: Date) => {
	if (!dateValue) return ''

	const date = getNewDate(dateValue)
	if (!isValid(date)) return ''
	return format(date, 'HH:mm', { locale: ptBR })
}

const formatRelativeDate = (daveValue: Date | number | string) => {
	if (!daveValue) return ''

	const currentDate = new Date()
	const date = getNewDate(daveValue)
	if (!isValid(date)) return ''

	const distance = formatDistance(date, currentDate, { locale: ptBR })
	const relative = formatRelative(date, currentDate, { locale: ptBR })

	if (distance.match(/7\sdia?/)) {
		const hourAndMinutes = `${date.getUTCHours()}:${date.getUTCMinutes()}`
		return `${relative} às ${hourAndMinutes}`
	}
	return relative.replace('-feira', '')
}

export { getNewDate, formatDate, formatHour, formatRelativeDate }
