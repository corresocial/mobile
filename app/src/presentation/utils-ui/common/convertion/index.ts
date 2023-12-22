function convertTextToNumber(text: string): number | null {
	const cleanedInput = text.replace(/,+/, ',')
	const parsedNumber = parseFloat(cleanedInput.replace(',', '.'))
	return Number.isNaN(parsedNumber) ? null : parsedNumber
}

export { convertTextToNumber }
