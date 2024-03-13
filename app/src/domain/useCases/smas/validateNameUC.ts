import { validateName } from '../../rules/smas/validatSmasInfo'

const validateNameUC = (NISValue: string) => {
	return validateName(NISValue)
}

export { validateNameUC }
