import { BEE, Binary } from '@domain/entities/smas/types'

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

function structureBeeObject(responseData: BEE) {
	return {
		NIS: responseData.nis,
		benefitRequested: benefitWasRequested(responseData.solicitacao_beneficio),
		benefitGranted: getBenefitGranted(responseData.cartao_alimentacao_concedido, responseData.deposito_conta),
		inAnalysis: benefitUnderAnalysis(responseData.beneficio_nao_concedido, responseData.cartao_alimentacao_concedido, responseData.deposito_conta),
		grantDate: responseData.data_concedido || 'xx/xx/xxxx',
		expectedDate: responseData.data_concedido || 'xx/xx/xxxx',
	}
}

// feat(smas): Adiciona tratativa data de concessão e data de liberação de benefício emergencial

export { structureBeeObject }
