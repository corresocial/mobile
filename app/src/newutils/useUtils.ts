import { objectValuesAreEquals } from './methods/objects'
import { remoteDuplicatedObjectItemsByKey } from './remoteDuplicatedItemsByKey'
import { UtilsInterface } from './UtilsInterface'

function useUtils(): UtilsInterface {
	return {
		objectValuesAreEquals: objectValuesAreEquals,
		remoteDuplicatedObjectItemsByKey: remoteDuplicatedObjectItemsByKey
	}
}

export { useUtils }
