import { validateName } from '../core/validatSmasInfo'

const validateNameUC = (NISValue: string) => {
	return validateName(NISValue)
}

export { validateNameUC }
