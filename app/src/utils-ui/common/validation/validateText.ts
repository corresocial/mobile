function textHasOnlyNumbers(text?: string | number) {
	if (!text) return false
	return /^\d+$/.test(`${text}`)
}

export { textHasOnlyNumbers }
