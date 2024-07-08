/* eslint-disable valid-typeof */
export class Validator {
	static stackErros(...errors: (string | null)[]): string[] | null {
		const filteredErrors = errors.filter((error) => error !== null) as string[]
		return filteredErrors.length > 0 ? filteredErrors : null
	}

	static notNull(value: any, errorMessage: string): string | null {
		return (value !== null && value !== undefined) ? null : errorMessage
	}

	static notEmpty(value: string, errorMessage: string): string | null {
		if (Validator.notNull(value, errorMessage)) return errorMessage
		return value.trim() !== '' ? null : errorMessage
	}

	static sizeSmallerThan(value: string | any[], minSize: number, errorMessage: string): string | null {
		if (Validator.notNull(value, errorMessage)) return errorMessage
		return value.length >= minSize ? null : errorMessage
	}

	static sizeBigThan(value: string | any[], maxSize: number, errorMessage: string): string | null {
		if (Validator.notNull(value, errorMessage)) return errorMessage
		return value.length <= maxSize ? null : errorMessage
	}

	static numberSmallerThan(value: number, minValue: number, errorMessage: string): string | null {
		if (Validator.notNull(value, errorMessage)) return errorMessage
		return value >= minValue ? null : errorMessage
	}

	static numberBigThan(value: number, maxValue: number, errorMessage: string): string | null {
		if (Validator.notNull(value, errorMessage)) return errorMessage
		return value <= maxValue ? null : errorMessage
	}

	static isIncluded(list: any[], value: any, errorMessage: string): string | null {
		return (list || []).includes(value) ? null : errorMessage
	}

	static regex(value: string, regex: RegExp, errorMessage: string): string | null {
		if (Validator.notNull(value, errorMessage)) return errorMessage
		return regex.test(value) ? null : errorMessage
	}

	static isTypeOf(value: any, expectedType: string, errorMessage: string): boolean | string {
		return typeof value === expectedType ? true : errorMessage
	}
}
