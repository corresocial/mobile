import { validateNIS } from '../rules/validatSmasInfo'

const validateNISUC = (NISValue: string) => {
	return validateNIS(NISValue)
}

export { validateNISUC }
