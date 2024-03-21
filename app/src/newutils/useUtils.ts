import { objectValuesAreEquals } from './methods/objects'
import { UtilsInterface } from './UtilsInterface'

function useUtils(): UtilsInterface {
	return {
		objectValuesAreEquals: objectValuesAreEquals
	}
}

export { useUtils }
