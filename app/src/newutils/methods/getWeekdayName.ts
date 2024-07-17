const weekDayNames = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

function getWeekdayName(day: number): string {
	return weekDayNames[day]
}

export { getWeekdayName }
