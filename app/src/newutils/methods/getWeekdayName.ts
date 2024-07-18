const weekDayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

function getWeekdayName(day: number): string {
	return weekDayNames[day]
}

export { getWeekdayName }
