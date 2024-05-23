export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

export function mergeObjects<T>(obj1: T, obj2: RecursivePartial<T>): T {
	const result: any = { ...obj1 }

	Object.keys(obj2).forEach((key) => {
		const val1 = (obj1 as any)[key]
		const val2 = (obj2 as any)[key]

		if (val1 !== null && typeof val1 === 'object' && !Array.isArray(val1)
			&& val2 !== null && typeof val2 === 'object' && !Array.isArray(val2)) {
			result[key] = mergeObjects(val1, val2)
		} else {
			result[key] = val2
		}
	})

	return result
}
