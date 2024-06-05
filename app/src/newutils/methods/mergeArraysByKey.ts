type Obj = { [key: string]: any }

export function mergeArraysByKey<T extends Obj, K extends keyof T>(arr1: T[], arr2: T[], key: K): T[] {
	const map = new Map<T[K], T>()

	arr1.forEach((item) => {
		if (key in item) {
			map.set(item[key], item)
		}
	})

	arr2.forEach((item) => {
		if (key in item) {
			map.set(item[key], item)
		}
	})

	return Array.from(map.values())
}
