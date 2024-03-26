import { validateNIS } from '../core/validatSmasInfo'

const validateNISUC = (NISValue: string) => {
	return validateNIS(NISValue)
}

export { validateNISUC }
