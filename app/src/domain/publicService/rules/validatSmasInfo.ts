const validateNIS = (NISValue: string) => {
	const cleanValue = NISValue.trim()
	const NISNumbers = cleanValue.match(/\d+/g)
	return NISNumbers ? NISNumbers.join('').length === 11 : false
}

const validateName = (NISValue: string) => {
	const cleanName = NISValue.replace(/[^a-zA-Z]/g, '')
	return /^[a-zA-Z]+$/.test(cleanName)
}

export { validateNIS, validateName }
