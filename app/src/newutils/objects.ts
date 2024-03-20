const objectValuesAreEquals = (completeObject: any, partialObject: any) => {
	const res = Object.entries(partialObject).reduce((acc: boolean[], [key, value]) => {
		return [...acc, completeObject[key] === value]
	}, [])

	const areEquals = res.every((item) => item === true)
	return areEquals
}

export { objectValuesAreEquals }
