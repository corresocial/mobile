import { getArrayObjectDifferences } from './methods/getArrayObjectDifferences'
import { getLastItem } from './methods/getLastItem'
import { getMonthName } from './methods/getMonthName'
import { getObjectDifferences } from './methods/getObjectDifferences'
import { getWeekdayName } from './methods/getWeekdayName'
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
		mergeObjects: mergeObjects,

		// OTHER
		getMonthName: getMonthName,
		getWeekdayName: getWeekdayName
	}
}

export { useUtils }
