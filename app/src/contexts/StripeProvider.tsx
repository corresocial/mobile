import React, { useEffect } from 'react'
import { StripeProvider as StripeProviderRaw, } from '@stripe/stripe-react-native'

import { STRIPE_PUBLISHABLE_KEY } from '@env'

import { getStripePlans, getStripeProducts } from '../services/stripe'

interface StripeProviderProps {
	children: React.ReactElement
}

function StripeProvider({ children }: StripeProviderProps) {
	useEffect(() => {
		getProducts()
	}, [])

	const getProducts = async () => {
		try {
			const stripeProducts = await getStripeProducts()
			const stripeProductsPlans = await getStripePlans(stripeProducts)

			Object.values(stripeProductsPlans).forEach((plan) => {
				console.log(plan)
				console.log('\n')
			})
		} catch (error) {
			console.error('Erro ao obter os produtos do Stripe:', error)
		}
	}

	return (
		<StripeProviderRaw publishableKey={STRIPE_PUBLISHABLE_KEY}>
			{children}
		</StripeProviderRaw>
	)
}

export { StripeProvider }
