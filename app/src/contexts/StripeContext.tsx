/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from 'react'
import { StripeProvider as StripeProviderRaw, CardFormView, confirmPayment, useStripe, createPaymentMethod, CardForm, CardField } from '@stripe/stripe-react-native'
import { STRIPE_PUBLISHABLE_KEY, STRIPE_API_URL } from '@env'
import axios from 'axios'
import { getStripePlans, getStripeProducts } from '../services/stripe/products'
import { StripeProducts } from '../services/stripe/types'

interface StripeContextProps {
	children: React.ReactElement
}

interface StripeContextState {
	stripeProductsPlans: StripeProducts
	createCustomer: (paymentMethodId: string) => Promise<any>
	getCustomerPaymentMethods: (customerId: string) => Promise<any>
	createCustomPaymentMethod: () => Promise<any>
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => Promise<any>
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => Promise<any>
	getCustomerSubscriptions: (customerId: string) => Promise<any>
	createSubscription: (customerId: string, paymentMethodId?: string) => Promise<any>
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => Promise<any>
	cancelSubscription: (subscriptionId: string) => Promise<any>
}

export const StripeContext = createContext<StripeContextState>({
	stripeProductsPlans: {
		cityMonthly: { id: '', name: '', price: '' },
		cityYearly: { id: '', name: '', price: '' },
		countryMonthly: { id: '', name: '', price: '' },
		countryYearly: { id: '', name: '', price: '' }
	},
	createCustomer: () => new Promise(() => { }),
	getCustomerPaymentMethods: (customerId: string) => new Promise(() => { }),
	createCustomPaymentMethod: () => new Promise(() => { }),
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	getCustomerSubscriptions: (customerId: string) => new Promise(() => { }),
	createSubscription: (customerId: string, paymentMethodId?: string) => new Promise(() => { }),
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => new Promise(() => { }),
	cancelSubscription: (subscriptionId: string) => new Promise(() => { })
})

const defaultAxiosHeader = {
	'Content-Type': 'application/x-www-form-urlencoded',
	Authorization: 'bearer sk_test_51Mw5LNEpbbWylPkQ22X0dlJ5opvdjR0qYsIk3pWvDFilNPFJMi9zRx1Y8xV8fTu18xC8azzEmWusnwHnJ3BvzPi000MGcIVjxu'
}

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
					name: 'corre.teste.paymentMethod',
				}
			}
		})

		return { error, paymentMethod }
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

	async function createCustomer(paymentMethodId: string) {
		const customerData = {
			name: 'corre.teste.after.paymnet',
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

		return { customerId: result.data.id }
	}

	async function getCustomerSubscriptions(customerId: string) {
		const response = await axios.get(`${STRIPE_API_URL}/subscriptions`, {
			params: {
				customer: customerId,
				status: 'active',
			},
			headers: { ...defaultAxiosHeader }
		})

		return response.data.data.length > 0 ? response.data.data[0] : null
	}

	async function createSubscription(customerId: string, paymentMethodId?: string) { // CARD 4000000760000002
		const postData = {
			customer: customerId,
			items: [
				{
					price: 'price_1Mw5PPEpbbWylPkQXylEhX0a', // Substitua pelo ID real do preço/produto
				},
			],
			default_payment_method: paymentMethodId,
			payment_behavior: 'default_incomplete', // error_if_incomplete
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
				createCustomer,
				createCustomPaymentMethod,
				getCustomerSubscriptions,
				createSubscription,
				cancelSubscription,
				performPaymentConfirm,
				getCustomerPaymentMethods,
				attachPaymentMethodToCustomer,
				setDefaultPaymentMethodToCustomer
			}}
		>
			<StripeProviderRaw publishableKey={STRIPE_PUBLISHABLE_KEY}>
				{children}
			</StripeProviderRaw>
		</StripeContext.Provider>
	)
}
