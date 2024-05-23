import { RecursivePartial } from './methods/mergeObjects'

interface UtilsInterface {
	// ARRAY
	removeDuplicatedItemsByKey(array: any[], key: string): any[]

	// OBJECT
	objectValuesAreEquals(completeObject: object, partialObject: object): boolean
	getObjectDifferences<T>(obj1: T, obj2: T): Partial<T> | null
	mergeObjects<T>(obj1: T, obj2: RecursivePartial<T>): T
}

export { UtilsInterface }
