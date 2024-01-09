const validateNIS = (NISValue: string) => {
	const cleanValue = NISValue.trim()
	const NISNumbers = cleanValue.match(/\d+/g)
	return NISNumbers ? NISNumbers.join('').length === 11 : false
}

export { validateNIS }
