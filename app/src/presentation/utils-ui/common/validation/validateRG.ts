function validateRG(rg: string) {
	const cleanRG = rg.replace(/[^\d]/g, '')
	if (cleanRG.length < 7 || cleanRG.length > 10) return false
	return true
}

export { validateRG }
