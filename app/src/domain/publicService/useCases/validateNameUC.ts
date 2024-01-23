import { validateName } from '../rules/validatSmasInfo'

const validateNameUC = (NISValue: string) => {
	return validateName(NISValue)
}

export { validateNameUC }
