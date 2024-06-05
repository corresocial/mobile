function objectValuesAreEquals(completeObject: any, partialObject: any) {
	if (!isObject(completeObject) && !isObject(partialObject)) return false

	const res = Object.entries(partialObject).reduce((acc: boolean[], [key, value]) => {
		return [...acc, completeObject[key] === value]
	}, [])

	const areEquals = res.every((item) => item === true)
	return areEquals
}

function isObject(obj: object) {
	return typeof obj === 'object' && obj !== null
}

export { objectValuesAreEquals }
