import React, { createContext, useEffect, useState } from 'react'
import { StripeProvider as StripeProviderRaw } from '@stripe/stripe-react-native'
import { STRIPE_PUBLISHABLE_KEY } from '@env'
import { getStripePlans, getStripeProducts } from '../services/stripe'
import { StripeProducts } from '../services/stripe/types'

interface StripeContextProps {
	children: React.ReactElement;
}

interface StripeContextState {
	stripeProductsPlans: StripeProducts;
}

export const StripeContext = createContext<StripeContextState>({
	stripeProductsPlans: {
		cityMonthly: { id: '', name: '', price: '' },
		cityYearly: { id: '', name: '', price: '' },
		countryMonthly: { id: '', name: '', price: '' },
		countryYearly: { id: '', name: '', price: '' }
	}
})

export function StripeProvider({ children }: StripeContextProps) {
	const [stripeProductsPlans, setStripeProductsPlans] = useState({})

	useEffect(() => {
		getProducts()
	}, [])

	async function getProducts() {
		try {
			const stripeProducts = await getStripeProducts()
			const remoteStripeProductsPlans = await getStripePlans(stripeProducts)

			setStripeProductsPlans(remoteStripeProductsPlans)
			console.log('Produtos do Stripe obtidos com sucesso!')
			/*
						Object.values(stripeProductsPlans).forEach((plan) => {
							console.log(plan)
							console.log('\n')
		}) */
		} catch (error) {
			console.error('Erro ao obter os produtos do Stripe:', error)
		}
	}

	return (
		<StripeContext.Provider
			value={{ stripeProductsPlans: stripeProductsPlans as StripeProducts }}
		>
			<StripeProviderRaw publishableKey={STRIPE_PUBLISHABLE_KEY}>
				{children}
			</StripeProviderRaw>
		</StripeContext.Provider>
	)
}
