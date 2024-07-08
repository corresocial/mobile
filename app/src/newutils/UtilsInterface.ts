import { SocialMedia } from '@domain/user/entity/types'

import { Obj } from './methods/mergeArraysByKey'
import { RecursivePartial } from './methods/mergeObjects'

interface UtilsInterface {
	// ARRAY
	removeDuplicatedItemsByKey(array: any[], key: string): any[]
	getArrayObjectDifferences(firstArray: SocialMedia[], secondArray: SocialMedia[]): SocialMedia[]
	mergeArraysByKey(arr1: Obj[], arr2: Obj[], key: string): Obj[]
	getLastItem<T>(items: T[] | null | undefined): T | undefined

	// OBJECT
	objectValuesAreEquals(completeObject: object, partialObject: object): boolean
	getObjectDifferences<T>(obj1: T, obj2: T): Partial<T> | null
	mergeObjects<T>(obj1: T, obj2: RecursivePartial<T>): T
}

export { UtilsInterface }
