const arrayIsEmpty = (array: any) => {
	try {
		if (!Array.isArray(array)) return true
		if (!array.length) return true
		return false
	} catch (err) {
		return true
	}
}

export { arrayIsEmpty }
