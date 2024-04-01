import { validateName } from '../core/validatSmasInfo'

const validateNameDM = (NISValue: string) => {
	return validateName(NISValue)
}

export { validateNameDM }
