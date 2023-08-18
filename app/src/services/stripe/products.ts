import axios from 'axios'
import { StripeProducts } from './types'
import { getEnvVars } from '../../../environment'

const { STRIPE_SECRET_KEY } = getEnvVars()

async function getStripeProducts() {
	const result = await axios.get('https://api.stripe.com/v1/products', {
		headers: { Authorization: `bearer ${STRIPE_SECRET_KEY}` },
	})

	return result.data.data
}

async function getStripePlans(stripeProducts: any[]) {
	const stripeProductsSummarized = stripeProducts.reduce(async (accumulator, product) => {
		const productRange = product.name.split('.')[1] === 'cidade' ? 'city' : 'country'
		const productPlan = product.name.split('.')[2] === 'mensal' ? 'Monthly' : 'Yearly'

		const price = await getPriceValueById(product.default_price)

		return {
			...(await accumulator),
			[`${productRange}${productPlan}`]: {
				id: product.id,
				name: product.name,
				priceId: product.default_price,
				price
			},
		}
	}, {})

	return stripeProductsSummarized as StripeProducts
}

async function getPriceValueById(priceId: string) {
	const priceResponse = await axios.get(`https://api.stripe.com/v1/prices/${priceId}`, {
		headers: { Authorization: `bearer ${STRIPE_SECRET_KEY}` }
	})

	const priceValue = (priceResponse.data.unit_amount / 100).toFixed(0)

	return priceValue
}

export { getStripeProducts, getStripePlans }
