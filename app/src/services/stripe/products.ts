import axios from 'axios'
import auth from '@react-native-firebase/auth'

import { StripeProducts } from './types'

import { getEnvVars } from '@infrastructure/environment'

const { FIREBASE_CLOUD_URL } = getEnvVars()

async function getStripeProducts() {
	const token = await auth().currentUser?.getIdToken()
	const result = await axios.get(`${FIREBASE_CLOUD_URL}/stripeApi/products`, {
		headers: { Authorization: `Bearer ${token}` },
	})

	return result.data.data
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
