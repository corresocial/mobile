/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StripeProvider as StripeProviderRaw, confirmPayment, createPaymentMethod } from '@stripe/stripe-react-native'

import { STRIPE_PUBLISHABLE_KEY, STRIPE_API_URL, STRIPE_SECRET_KEY } from '@env'
import { getStripePlans, getStripeProducts } from '../services/stripe/products'

import { StripeProducts } from '../services/stripe/types'
import { PostRange, SubscriptionPlan } from '../services/firebase/types'

interface StripeContextProps {
	children: React.ReactElement
}

interface StripeContextState {
	stripeProductsPlans: StripeProducts
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: string, priceId: string })
	createCustomer: (name: string, paymentMethodId: string) => Promise<any>
	getCustomerPaymentMethods: (customerId: string) => Promise<any>
	createCustomPaymentMethod: () => Promise<any>
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => Promise<any>
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => Promise<any>
	getCustomerSubscriptions: (customerId: string) => Promise<any>
	createSubscription: (customerId: string, priceId: string) => Promise<any>
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => Promise<any>
	cancelSubscription: (subscriptionId: string) => Promise<any>
}

const defaultPlan = { id: '', name: '', price: '', priceId: '' }

const defaultStripeProducts = {
	cityMonthly: { ...defaultPlan },
	cityYearly: { ...defaultPlan },
	countryMonthly: { ...defaultPlan },
	countryYearly: { ...defaultPlan }
}

export const StripeContext = createContext<StripeContextState>({
	stripeProductsPlans: { ...defaultStripeProducts },
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: '', priceId: '' }),
	createCustomer: (name: string, paymentMethodId: string) => new Promise(() => { }),
	getCustomerPaymentMethods: (customerId: string) => new Promise(() => { }),
	createCustomPaymentMethod: () => new Promise(() => { }),
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	getCustomerSubscriptions: (customerId: string) => new Promise(() => { }),
	createSubscription: (customerId: string, priceId: string) => new Promise(() => { }),
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => new Promise(() => { }),
	cancelSubscription: (subscriptionId: string) => new Promise(() => { })
})

const defaultAxiosHeader = {
	'Content-Type': 'application/x-www-form-urlencoded',
	Authorization: `bearer ${STRIPE_SECRET_KEY}`
}

export function StripeProvider({ children }: StripeContextProps) {
	const [stripeProductsPlans, setStripeProductsPlans] = useState<StripeProducts>(defaultStripeProducts)

	useEffect(() => {
		getProducts()
	}, [])

	async function getProducts() {
		try {
			const stripeProducts = await getStripeProducts()
			const remoteStripeProductsPlans = await getStripePlans(stripeProducts)

			setStripeProductsPlans(remoteStripeProductsPlans)
			console.log('Produtos do Stripe obtidos com sucesso!')
		} catch (error) {
			console.error('Erro ao obter os produtos do Stripe:', error)
		}
	}

	const getRangePlanPrice = (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => {
		if (!subscriptionRange || !subscriptionPlan) return { price: '', priceId: '' }

		switch (subscriptionPlan) {
			case 'monthly': {
				if (subscriptionRange === 'city') {
					return {
						price: stripeProductsPlans.cityMonthly.price,
						priceId: stripeProductsPlans.cityMonthly.priceId
					}
				}
				if (subscriptionRange === 'country') {
					return {
						price: stripeProductsPlans.countryMonthly.price,
						priceId: stripeProductsPlans.countryMonthly.priceId
					}
				}
				break
			}
			case 'yearly': {
				if (subscriptionRange === 'city') {
					return {
						price: stripeProductsPlans.cityYearly.price,
						priceId: stripeProductsPlans.cityYearly.priceId
					}
				}
				if (subscriptionRange === 'country') {
					return {
						price: stripeProductsPlans.countryYearly.price,
						priceId: stripeProductsPlans.countryYearly.priceId
					}
				}
				break
			}
			default: return { price: '', priceId: '' }
		}

		return { price: '', priceId: '' }
	}

	async function getCustomerPaymentMethods(customerId: string) {
		const response = await axios.get(`${STRIPE_API_URL}/payment_methods`, {
			params: {
				customer: customerId,
				type: 'card',
			},
			headers: { ...defaultAxiosHeader }
		})

		console.log(response.data)
		return response.data.data.length > 0 ? response.data.data[0] : null
	}

	async function createCustomPaymentMethod() {
		const { error, paymentMethod } = await createPaymentMethod({
			paymentMethodType: 'Card',
			paymentMethodData: {
				billingDetails: {
					name: 'Credit Card',
				}
			}
		})

		return { error, paymentMethodId: paymentMethod?.id }
	}

	async function attachPaymentMethodToCustomer(customerId: string, paymentMethodId: string) {
		await axios.post(`${STRIPE_API_URL}/payment_methods/${paymentMethodId}/attach`, {
			customer: customerId,
		}, {
			headers: { ...defaultAxiosHeader }
		})

		return true
	}

	async function setDefaultPaymentMethodToCustomer(customerId: string, paymentMethodId: string) {
		await axios.post(`${STRIPE_API_URL}/customers/${customerId}`, {
			invoice_settings: {
				default_payment_method: paymentMethodId
			},
		}, {
			headers: { ...defaultAxiosHeader }
		})

		return true
	}

	/* async function customerAlreadyRegistred(customerId: string) {
		const response = await axios.get(`${STRIPE_API_URL}/customers`, {
			params: {
				customer: customerId,
				status: 'active',
			},
			headers: { ...defaultAxiosHeader }
		})

		return response.data.data.length > 0 ? response.data.data[0] : null
	} */

	async function createCustomer(name: string, paymentMethodId: string) {
		const customerData = {
			name,
			description: 'Assinante do corre',
			phone: '+12123451234',
			address: {},
			payment_method: paymentMethodId,
		}

		const result = await axios.post(
			`${STRIPE_API_URL}/customers`, // CAN SET PAYMENT METHOD DEFAUL
			{ ...customerData },
			{
				headers: { ...defaultAxiosHeader }
			}
		)
		const customerId = result.data.id
		return customerId
	}

	async function getCustomerSubscriptions(customerId: string) {
		const response = await axios.get(`${STRIPE_API_URL}/subscriptions`, {
			params: {
				customer: customerId,
				status: 'active',
			},
			headers: { ...defaultAxiosHeader }
		})

		const subscriptionsId = response.data.data.length > 0
			? response.data.data.map((subscription: any) => subscription.id) // TODO Type
			: null

		return subscriptionsId
	}

	async function createSubscription(customerId: string, priceId: string) { // CARD 4000000760000002
		const postData = {
			customer: customerId,
			items: [
				{
					price: priceId, // Substitua pelo ID real do preço/produto
				},
			],
			// default_payment_method: paymentMethodId,
			payment_behavior: 'error_if_incomplete', // error_if_incomplete
			expand: ['latest_invoice.payment_intent'],
		}

		const config = { headers: { ...defaultAxiosHeader } }

		const response = await axios.post(`${STRIPE_API_URL}/subscriptions`, postData, config)

		const subscriptionId = response.data.id
		const subscriptionClientSecret = response.data.latest_invoice.payment_intent.client_secret

		return { subscriptionId, subscriptionClientSecret }
	}

	async function cancelSubscription(subscriptionId: string) {
		const config = { headers: { ...defaultAxiosHeader } }
		const response = await axios.delete(`${STRIPE_API_URL}/subscriptions/${subscriptionId}`, config)
		return response.data
	}

	async function performPaymentConfirm(paymentMethodId: string, subscriptionClientSecret: string) {
		const { error: err, paymentIntent } = await confirmPayment(
			subscriptionClientSecret,
			{
				paymentMethodType: 'Card',
				paymentMethodData: {
					paymentMethodId,
					billingDetails: {
						name: 'corre.teste.confirmPayment',
					}
				}
			}
		)

		return { error: err, paymentIntent }
	}

	return (
		<StripeContext.Provider
			value={{
				stripeProductsPlans: stripeProductsPlans as StripeProducts,
				getRangePlanPrice,
				createCustomer,
				createCustomPaymentMethod,
				getCustomerSubscriptions,
				createSubscription,
				cancelSubscription,
				performPaymentConfirm,
				getCustomerPaymentMethods,
				attachPaymentMethodToCustomer,
				setDefaultPaymentMethodToCustomer,
			}}
		>
			<StripeProviderRaw publishableKey={STRIPE_PUBLISHABLE_KEY}>
				{children}
			</StripeProviderRaw>
		</StripeContext.Provider>
	)
}
