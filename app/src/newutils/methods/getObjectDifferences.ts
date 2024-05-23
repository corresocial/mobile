export function getObjectDifferences<T>(obj1: T, obj2: T): Partial<T> | null {
	const keys = Object.keys(obj2 as any) as (keyof T)[]

	const differencesObject = keys.reduce<Partial<T>>((acc, key) => {
		const val1 = obj1[key]
		const val2 = obj2[key]

		if (Array.isArray(val1) && Array.isArray(val2)) {
			if (!arraysEqual(val1, val2)) {
				return { ...acc, [key]: val2 }
			}
		} else if (
			val1 !== null
			&& val2 !== null
			&& typeof val1 === 'object'
			&& typeof val2 === 'object'
		) {
			const nestedDiff = getObjectDifferences(val1, val2)
			if (nestedDiff && Object.keys(nestedDiff).length > 0) {
				return { ...acc, [key]: nestedDiff }
			}
		} else if (val1 !== val2) {
			return { ...acc, [key]: val2 }
		} else if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
			return { ...acc, [key]: val2 }
		}

		return acc
	}, {})

	return Object.keys(differencesObject).length ? differencesObject : null
}

function arraysEqual(arr1: any[], arr2: any[]): boolean {
	if (arr1.length !== arr2.length) {
		return false
	}
	return arr1.every((val, index) => val === arr2[index])
}
