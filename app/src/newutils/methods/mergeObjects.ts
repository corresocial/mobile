export type RecursivePartial<T> = {
	[P in keyof T]?: T[P] extends object ? RecursivePartial<T[P]> : T[P];
};

/**
* A função mergeObjects é utilizada para mesclar dois objetos,
* onde o segundo objeto pode ser uma versão parcial e recursiva do primeiro.
* Essa função permite a mesclagem profunda de objetos, combinando propriedades de forma recursiva
* para objetos aninhados.
*/
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
