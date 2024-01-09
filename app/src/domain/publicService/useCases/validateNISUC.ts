import { validateNIS } from '../rules/validateNIS'

const validateNISUC = (NISValue: string) => {
	return validateNIS(NISValue)
}

export { validateNISUC }
