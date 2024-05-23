import { getObjectDifferences } from './methods/getObjectDifferences'
import { mergeObjects } from './methods/mergeObjects'
import { objectValuesAreEquals } from './methods/objectValuesAreEquals'
import { removeDuplicatedItemsByKey } from './methods/removeDuplicatedItemsByKey'
import { UtilsInterface } from './UtilsInterface'

function useUtils(): UtilsInterface {
	return {
		objectValuesAreEquals: objectValuesAreEquals,
		getObjectDifferences: getObjectDifferences,
		removeDuplicatedItemsByKey: removeDuplicatedItemsByKey,
		mergeObjects: mergeObjects
	}
}

export { useUtils }
