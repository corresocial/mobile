import { validateNIS } from '../core/validatSmasInfo'

const validateNISDM = (NISValue: string) => {
	return validateNIS(NISValue)
}

export { validateNISDM }
