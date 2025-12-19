import { firebaseFunctions } from '@infrastructure/firebase'

import { StripeProducts } from './types'

async function getStripeProducts() {
    const stripeApi = firebaseFunctions.httpsCallable('stripeApi')
    const result = await stripeApi({ action: 'products' })
    return (result.data as any).data
}

async function getStripePlans(stripeProducts: any[]) {
	const stripeProductsSummarized = stripeProducts.reduce((accumulator, product) => {
		const nameParts = product.name.split('.')
		// Handle potential naming issues safely
		if (nameParts.length < 3) return accumulator

		const productRange = nameParts[1] === 'cidade' ? 'city' : 'country'
		const productPlan = nameParts[2] === 'mensal' ? 'Monthly' : 'Yearly'

		// product.default_price is an object from expansion
		const priceData = product.default_price
		const priceValue = (priceData && priceData.unit_amount)
			? (priceData.unit_amount / 100).toFixed(0)
			: '0'

		return {
			...accumulator,
			[`${productRange}${productPlan}`]: {
				id: product.id,
				name: product.name,
				priceId: priceData?.id || '',
				price: priceValue
			},
		}
	}, {})

	return stripeProductsSummarized as StripeProducts
}

export { getStripeProducts, getStripePlans }
