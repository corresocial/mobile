import axios from 'axios'
import { StripeProducts } from './types'

async function getStripeProducts() {
	const result = await axios.get('https://api.stripe.com/v1/products', {
		headers: { Authorization: 'bearer sk_test_51Mw5LNEpbbWylPkQ22X0dlJ5opvdjR0qYsIk3pWvDFilNPFJMi9zRx1Y8xV8fTu18xC8azzEmWusnwHnJ3BvzPi000MGcIVjxu' },
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
				price,
			},
		}
	}, {})

	return stripeProductsSummarized as StripeProducts
}

async function getPriceValueById(priceId: string) {
	const priceResponse = await axios.get(`https://api.stripe.com/v1/prices/${priceId}`, {
		headers: { Authorization: 'bearer sk_test_51Mw5LNEpbbWylPkQ22X0dlJ5opvdjR0qYsIk3pWvDFilNPFJMi9zRx1Y8xV8fTu18xC8azzEmWusnwHnJ3BvzPi000MGcIVjxu' },
	})

	return (priceResponse.data.unit_amount / 100).toFixed(2)
}

export { getStripeProducts, getStripePlans }
