export type Obj = { [key: string]: any }

export function mergeArraysByKey(arr1: Obj[], arr2: Obj[], key: string): Obj[] {
	const map = new Map<any, Obj>()

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
