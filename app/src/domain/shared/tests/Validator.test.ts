import { Validator } from '../utils/Validator'

describe('Shared Validator.ts', () => {
	test('Deve combinar os erros', () => {
		const errors = Validator.stackErros(
			Validator.notEmpty('', 'erro1'),
			Validator.notEmpty('', 'erro2'),
			Validator.notEmpty('teste', 'erro1')
		)

		expect(errors?.join(', ')).toBe('erro1, erro2')
	})

	test('Deve retornar null quando não houver erros', () => {
		const errors = Validator.stackErros(
			Validator.notEmpty('teste', 'erro1'),
			Validator.notEmpty('teste', 'erro2'),
			Validator.notEmpty('teste', 'erro1')
		)

		expect(errors).toBeNull()
	})

	test('Deve retornar null com texto não nulo', () => {
		const error = Validator.notNull('Bom dia', 'Texto inválido')
		expect(error).toBeNull()
	})

	test('Deve retornar mensagem de erro com valor nulo', () => {
		const errorMessage = 'Texto inválido'
		const error = Validator.notNull(null, errorMessage)
		expect(error).toBe(errorMessage)
	})
	test('Deve retornar null com texto não vazio', () => {
		const error = Validator.notEmpty('Bom dia', 'Texto vazio')
		expect(error).toBeNull()
	})

	test('Deve retornar erro ao enviar valor null ou undefines', () => {
		const error1 = Validator.notEmpty(null as any, 'Texto vazio')
		const error2 = Validator.notEmpty(undefined as any, 'Texto vazio')
		expect(error1).toBe('Texto vazio')
		expect(error2).toBe('Texto vazio')
	})

	test('Deve retornar mensagem de erro com valor vazio', () => {
		const errorMessage = 'Texto vazio'
		const error = Validator.notEmpty('   ', errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro com valor null', () => {
		const errorMessage = 'Texto vazio'
		const error = Validator.notEmpty(null as any, errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar null com texto maior que 10', () => {
		const error = Validator.sizeSmallerThan('Bom dia dia dia', 10, 'Texto muito grande')
		expect(error).toBeNull()
	})

	test('Deve retornar mensagem de erro com texto menor que 10', () => {
		const errorMessage = 'Texto muito grande'
		const error = Validator.sizeSmallerThan('Bom dia', 10, errorMessage)

		expect(error).toBe(errorMessage)
	})

	test('Deve retornar null com texto menor que 10', () => {
		const errorMessage = 'Texto muito grande'
		const error = Validator.sizeBigThan('Bom dia', 10, errorMessage)
		expect(error).toBeNull()
	})

	test('Deve retornar erro com número menor que 10', () => {
		const errorMessage = 'Valor numérico muito pequeno'
		const error = Validator.numberSmallerThan(5, 10, errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar erro com número com valor null', () => {
		const errorMessage = 'Valor numérico muito pequeno'
		const error = Validator.numberSmallerThan(null as any, 10, errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar null com texto igual a 10', () => {
		const error1 = Validator.sizeBigThan('Wellington', 10, '')
		const error2 = Validator.sizeSmallerThan('Wellington', 10, '')
		expect(error1).toBeNull()
		expect(error2).toBeNull()
	})

	test('Deve retornar mensagem de erro com texto maior que 10', () => {
		const errorMessage = 'Texto muito grande'
		const error = Validator.sizeBigThan('Bom dia Bom dia', 10, errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro com número maior que 10', () => {
		const errorMessage = 'Valor numérico muito grande'
		const error = Validator.numberBigThan(11, 10, errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro com número igual a null', () => {
		const errorMessage = 'Valor numérico muito grande'
		const error = Validator.numberBigThan(null as any, 10, errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar retornar null com array maior que 10', () => {
		const errorMessage = 'Array muito grande'
		const error = Validator.sizeSmallerThan([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, errorMessage)

		expect(error).toBeNull()
	})

	test('Deve retornar mensagem de erro com array menos que 10', () => {
		const errorMessage = 'Array muito grande'
		const error = Validator.sizeSmallerThan([1, 2, 3], 10, errorMessage)

		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro com valor null', () => {
		const errorMessage = 'Valor inválido'
		const error = Validator.sizeSmallerThan(null as any, 10, errorMessage)

		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro com valor null', () => {
		const errorMessage = 'Valor inválido'
		const error = Validator.sizeBigThan(null as any, 10, errorMessage)

		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro quando regex não dá match', () => {
		const errorMessage = 'Nada de regex encontrado'
		const error = Validator.regex('teste', /ue/, errorMessage)

		expect(error).toBe(errorMessage)
	})

	test('Deve retornar null quando o valor existir na lista', () => {
		const error1 = Validator.isIncluded(['oi', 'tchau'], 'oi', '')
		const error2 = Validator.isIncluded([1, 2, 3], 2, '')
		const error3 = Validator.isIncluded([false, true], false, '')
		expect(error1).toBeNull()
		expect(error2).toBeNull()
		expect(error3).toBeNull()
	})

	test('Deve retornar erro quando o valor não existir na lista', () => {
		const errorMessage = 'Item não está no array'
		const error = Validator.isIncluded(['oi', 'tchau'], 'até logo', errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar erro quando a lista for inválida', () => {
		const errorMessage = 'Lista inválida'
		const error = Validator.isIncluded(null as any, 'até logo', errorMessage)
		expect(error).toBe(errorMessage)
	})

	test('Deve retornar mensagem de erro quando passado valor null para regex', () => {
		const errorMessage = 'Valor inválido'
		const error = Validator.regex(null as any, /ue/, errorMessage)

		expect(error).toBe(errorMessage)
	})

	test('Deve retornar true quando for passado os valores e tipagens corretas', () => {
		const values = ['string', 43, {}, [], new Date()]
		const errorMessage = 'Tipo inválido'

		const stringRes = Validator.isTypeOf(values[0], 'string', errorMessage)
		const numberRes = Validator.isTypeOf(values[1], 'number', errorMessage)
		const objectRes = Validator.isTypeOf(values[2], 'object', errorMessage)
		const arrayRes = Validator.isTypeOf(values[3], 'object', errorMessage)

		expect(stringRes).toBe(true)
		expect(numberRes).toBe(true)
		expect(objectRes).toBe(true)
		expect(arrayRes).toBe(true)
	})

	test('Deve retornar mensagem de rro quando for passado os valores e tipagens incorretas', () => {
		const values = ['string', 43, {}, [], new Date()]
		const errorMessage = 'Tipo inválido'

		const stringRes = Validator.isTypeOf(values[0], 'number', errorMessage)
		const numberRes = Validator.isTypeOf(values[1], 'object', errorMessage)
		const objectRes = Validator.isTypeOf(values[2], 'string', errorMessage)
		const arrayRes = Validator.isTypeOf(values[3], 'string', errorMessage)

		expect(stringRes).toBe(errorMessage)
		expect(numberRes).toBe(errorMessage)
		expect(objectRes).toBe(errorMessage)
		expect(arrayRes).toBe(errorMessage)
	})
})
