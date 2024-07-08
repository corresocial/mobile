import { getArrayObjectDifferences } from './methods/getArrayObjectDifferences'
import { getLastItem } from './methods/getLastItem'
import { getObjectDifferences } from './methods/getObjectDifferences'
import { mergeArraysByKey } from './methods/mergeArraysByKey'
import { mergeObjects } from './methods/mergeObjects'
import { objectValuesAreEquals } from './methods/objectValuesAreEquals'
import { removeDuplicatedItemsByKey } from './methods/removeDuplicatedItemsByKey'
import { UtilsInterface } from './UtilsInterface'

function useUtils(): UtilsInterface {
	return {
		// ARRAY
		getArrayObjectDifferences: getArrayObjectDifferences,
		removeDuplicatedItemsByKey: removeDuplicatedItemsByKey,
		mergeArraysByKey: mergeArraysByKey,
		getLastItem: getLastItem,

		// OBJECT
		getObjectDifferences: getObjectDifferences,
		objectValuesAreEquals: objectValuesAreEquals,
		mergeObjects: mergeObjects
	}
}

export { useUtils }
