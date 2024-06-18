import { citizenRegisterErrors } from '@domain/shared/constants/citizenRegister/user/citizenRegisterErrors'
import { Validator } from '@domain/shared/utils/Validator'

export class UserName {
	readonly value: string

	constructor(name?: string) {
		this.value = name?.trim() || ''

		const errors = Validator.stackErros(
			Validator.notEmpty(this.value, citizenRegisterErrors.EMPTY_NAME),
			Validator.sizeSmallerThan(this.value, 3, citizenRegisterErrors.SMALL_NAME),
			Validator.sizeBigThan(this.value, 50, citizenRegisterErrors.LARGE_NAME),
			// Validator.notEmpty(this.value.split(' ')[1], citizenRegisterErrors.SINGLE_NAME),
			// Validator.regex(this.value, /^[a-zA-ZÁ-ú'-.\s]+$/, citizenRegisterErrors.NAME_INVALID_CHARACTERS),
		)

		if (errors) throw new Error(errors.join(', '))
	}

	get firstName(): string {
		return this.value.split(' ')[0]
	}

	get lastName(): string {
		return this.value.split(' ').pop() as string
	}
}
