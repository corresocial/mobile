import { BEE, Binary } from '@domain/smas/entity/types'

import { DateFnsAdapter } from '@infrastructure/Date/DateAdapter'

function benefitWasRequested(benefitRequested: Binary) {
	return benefitRequested === '1'
}

function getBenefitGranted(foodCardGranted: Binary, accountDepositGranted: Binary) {
	return foodCardGranted === '1'
		? 'cartão alimentação'
		: accountDepositGranted === '1'
			? 'depósito em conta'
			: ''
}

function benefitUnderAnalysis(benefitNotGranted: Binary, foodCardGranted: Binary, accountDepositGranted: Binary) {
	return benefitNotGranted === '0' && foodCardGranted === '0' && accountDepositGranted === '0'
}

function generateExpectReleaseDate(dateStr: string, daysAhead?: boolean) {
	try {
		const { addDays, format } = DateFnsAdapter()

		const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
		const match = dateStr.match(regex)
		if (!match) return null
		const [, dia, mes, ano] = match.map(Number)

		const formatedDay = dia < 10 ? `0${dia}` : dia.toString()
		const formatedMonth = mes < 10 ? `0${mes}` : mes.toString()
		const formatedStringDate = `${formatedDay}/${formatedMonth}/${ano}`

		const date = new Date(`${ano}-${formatedMonth}-${formatedDay}`)
		const newDate = addDays(date, 10)
		const newDateStr = format(newDate, 'dd/MM/yyyy')
		return daysAhead ? newDateStr : formatedStringDate
	} catch (err) {
		console.log(err)
		return null
	}
}

function structureBeeObject(responseData: BEE) {
	return {
		NIS: responseData.nis,
		benefitRequested: benefitWasRequested(responseData.solicitacao_beneficio),
		benefitGranted: getBenefitGranted(responseData.cartao_alimentacao_concedido, responseData.deposito_conta_concedido),
		inAnalysis: benefitUnderAnalysis(responseData.beneficio_nao_concedido, responseData.cartao_alimentacao_concedido, responseData.deposito_conta_concedido),
		grantDate: generateExpectReleaseDate(responseData.data_concedido) || responseData || 'data indisponível',
		expectedDate: generateExpectReleaseDate(responseData.data_concedido, true) || 'data indisponível',
	}
}

export { structureBeeObject }
