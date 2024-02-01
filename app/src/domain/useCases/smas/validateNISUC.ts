import { validateNIS } from '../../rules/smas/validatSmasInfo'

const validateNISUC = (NISValue: string) => {
	return validateNIS(NISValue)
}

export { validateNISUC }
