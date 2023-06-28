/* eslint-disable camelcase */
import React, { useContext, createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StripeProvider as StripeProviderRaw, confirmPayment, createPaymentMethod } from '@stripe/stripe-react-native'

import { STRIPE_PUBLISHABLE_KEY, STRIPE_API_URL, STRIPE_SECRET_KEY } from '@env'
import { getStripePlans, getStripeProducts } from '../services/stripe/products'

import { StripeProducts } from '../services/stripe/types'
import { PostRange, SubscriptionPlan } from '../services/firebase/types'
import { AuthContext } from './AuthContext'
import { dateHasExpired } from '../common/auxiliaryFunctions'

interface StripeContextProps {
	children: React.ReactElement
}

interface StripeContextState {
	stripeProductsPlans: StripeProducts
	subscriptionHasActive: boolean,
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: string, priceId: string })
	createCustomer: (name: string, paymentMethodId: string) => Promise<any>
	getCustomerPaymentMethods: (customerId: string) => Promise<any>
	createCustomPaymentMethod: () => Promise<any>
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => Promise<any>
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string, attach?: boolean) => Promise<any>
	getCustomerSubscriptions: (customerId: string) => Promise<any>
	createSubscription: (customerId: string, priceId: string) => Promise<any>
	updateStripeSubscription: (subscriptionId: string, priceId: string) => Promise<any>
	cancelSubscription: (subscriptionId: string) => Promise<any>
	refundSubscriptionValue: (customerId: string, subscriptionId: string) => Promise<any>
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => Promise<any>
	sendReceiptByEmail: (customerId: string) => Promise<any>
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
	subscriptionHasActive: true,
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: '', priceId: '' }),
	createCustomer: (name: string, paymentMethodId: string) => new Promise(() => { }),
	getCustomerPaymentMethods: (customerId: string) => new Promise(() => { }),
	createCustomPaymentMethod: () => new Promise(() => { }),
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	getCustomerSubscriptions: (customerId: string) => new Promise(() => { }),
	createSubscription: (customerId: string, priceId: string) => new Promise(() => { }),
	updateStripeSubscription: (subscriptionId: string, priceId: string) => new Promise(() => { }),
	cancelSubscription: (subscriptionId: string) => new Promise(() => { }),
	refundSubscriptionValue: (customerId: string, subscriptionId: string) => new Promise(() => { }),
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => new Promise(() => { }),
	sendReceiptByEmail: (customerId: string) => new Promise(() => { }),
})

const defaultAxiosHeader = {
	'Content-Type': 'application/x-www-form-urlencoded',
	Authorization: `bearer ${STRIPE_SECRET_KEY}`
}

const axiosConfig = { headers: { ...defaultAxiosHeader } }

export function StripeProvider({ children }: StripeContextProps) {
	const { userDataContext } = useContext(AuthContext)

	const [stripeProductsPlans, setStripeProductsPlans] = useState<StripeProducts>(defaultStripeProducts)
	const [subscriptionHasActive, setSubscriptionHasActive] = useState(true)

	useEffect(() => {
		getProducts()
		if (userHasSubscription()) {
			checkCurrentSubscriptionStatus()
		}
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
			...axiosConfig
		})

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
		await axios.post(
			`${STRIPE_API_URL}/payment_methods/${paymentMethodId}/attach`,
			{
				customer: customerId,
			},
			axiosConfig
		)

		return true
	}

	async function setDefaultPaymentMethodToCustomer(customerId: string, paymentMethodId: string, attach?: boolean) {
		attach && await attachPaymentMethodToCustomer(customerId, paymentMethodId)

		await axios.post(
			`${STRIPE_API_URL}/customers/${customerId}`,
			{
				invoice_settings: {
					default_payment_method: paymentMethodId
				},
			},
			axiosConfig
		)

		return true
	}

	/* async function customerAlreadyRegistred(customerId: string) {
		const response = await axios.get(`${STRIPE_API_URL}/customers`, {
			params: {
				customer: customerId,
				status: 'active',
			},
			...axiosConfig
		})

		return response.data.data.length > 0 ? response.data.data[0] : null
	} */

	async function createCustomer(name: string, paymentMethodId: string) {
		const customerData = {
			name,
			description: 'Assinante do corre',
			phone: '',
			email: '',
			address: {},
			payment_method: paymentMethodId,
		}

		const result = await axios.post(`${STRIPE_API_URL}/customers`, { ...customerData }, axiosConfig)
		const customerId = result.data.id
		return customerId
	}

	const checkCurrentSubscriptionStatus = async () => {
		try {
			const customerId = userDataContext.subscription?.customerId
			if (!customerId) return

			const res = await getCustomerSubscriptions(customerId, true)
			if (!res || !res.length) throw new Error('Não há faturas ativas')

			const endSubscriptionDate = res[0].current_period_end * 1000
			const currentDate = Math.floor(Date.now()) // 1 mês e 8 horas 2657984000

			// console.log(new Date(endSubscriptionDate * 1000))
			// console.log(new Date(currentDate * 1000))

			if (dateHasExpired(endSubscriptionDate, currentDate, 1)) {
				console.log('A fatura da assinatura está em dia.')
				setSubscriptionHasActive(true)
			} else {
				console.log('A fatura da assinatura está atrasada.')
				setSubscriptionHasActive(false)
			}
		} catch (err: any) {
			console.log('A assinatura está com problemas')
			setSubscriptionHasActive(false)
		}
	}

	const userHasSubscription = () => userDataContext.subscription && userDataContext.subscription.subscriptionRange !== 'near'

	async function getCustomerSubscriptions(customerId: string, returnLastSubscriptionData?: boolean) {
		const response = await axios.get(`${STRIPE_API_URL}/subscriptions`, {
			params: {
				customer: customerId,
				status: 'active',
			},
			...axiosConfig
		})

		const subscriptionsId = response.data.data.length > 0
			? returnLastSubscriptionData
				? response.data.data
				: response.data.data.map((subscription: any) => subscription.id) // TODO Type
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
			payment_behavior: 'error_if_incomplete', // error_if_incomplete
			expand: ['latest_invoice.payment_intent'],
			/* 	collection_method: 'send_invoice',
				days_until_due: 30, */
		}

		const response = await axios.post(`${STRIPE_API_URL}/subscriptions`, postData, axiosConfig)

		const subscriptionId = response.data.id
		const subscriptionClientSecret = response.data.latest_invoice.payment_intent.client_secret

		return { subscriptionId, subscriptionClientSecret }
	}

	const getSubscriptionData = async (subscriptionId: string) => {
		const res = await axios.get(`${STRIPE_API_URL}/subscriptions/${subscriptionId}`, axiosConfig)
		return res.data
	}

	const getLastUserPaymentIntentId = async (customerId: string) => {
		const query = `customer: '${customerId}' AND amount>1 AND status: 'succeeded'`
		const res = await axios.get(`${STRIPE_API_URL}/payment_intents/search?query=${encodeURIComponent(query)}`, axiosConfig)
		return res.data.data[0].id
	}

	const getLastUserPaymentInvoiceId = async (customerId: string) => {
		const query = `customer: '${customerId}' AND amount>1 AND status: 'succeeded'`
		const res = await axios.get(`${STRIPE_API_URL}/payment_intents/search?query=${encodeURIComponent(query)}`, axiosConfig)

		return res.data.data[0].invoice || ''
	}

	async function updateStripeSubscription(subscriptionId: string, newPrice: string) {
		const remoteSubscriptionData = await getSubscriptionData(subscriptionId)

		const subscriptionData = {
			proration_behavior: 'always_invoice',
			cancel_at_period_end: false,
			proration_date: Math.floor((Date.now()) / 1000), // + 1296000000 (15 dias)
			items: [
				{
					id: remoteSubscriptionData.items.data[0].id,
					price: newPrice,
				},
			]
		}

		await axios.post(`${STRIPE_API_URL}/subscriptions/${subscriptionId}`, subscriptionData, axiosConfig)
	}

	async function cancelSubscription(subscriptionId: string) {
		const response = await axios.delete(`${STRIPE_API_URL}/subscriptions/${subscriptionId}`, axiosConfig)

		setSubscriptionHasActive(true)
		return response.data
	}

	async function refundSubscriptionValue(customerId: string, subscriptionId: string) {
		try {
			const paymentIntentId = await getLastUserPaymentIntentId(customerId)

			const refundsData = {
				payment_intent: paymentIntentId,
				// amount: 1000 // Set refunds value in cents
			}

			await axios.post(`${STRIPE_API_URL}/refunds`, refundsData, axiosConfig)
		} catch (err) {
			return null
		}
	}

	async function performPaymentConfirm(paymentMethodId: string, subscriptionClientSecret: string) {
		const { error: err, paymentIntent } = await confirmPayment(
			subscriptionClientSecret,
			{
				paymentMethodType: 'Card',
				paymentMethodData: {
					paymentMethodId,
					billingDetails: {
						name: 'Pagamento de fatura',
					}
				}
			}
		)

		return { error: err, paymentIntent }
	}

	const sendReceiptByEmail = async (customerId: string) => {
		const invoiceId = await getLastUserPaymentInvoiceId(customerId)

		console.log(invoiceId)
		const customerData = {
			amount: 100,
			currency: 'BRL',
			payment_method_types: ['card'],
			receipt_email: 'wellingtonsouza.wsa100@gmail.com'
		}

		const result = await axios.post(`${STRIPE_API_URL}/payment_intents`, { ...customerData }, axiosConfig)
		console.log(result.data)
	}

	return (
		<StripeContext.Provider
			value={{
				stripeProductsPlans: stripeProductsPlans as StripeProducts,
				subscriptionHasActive,
				getRangePlanPrice,
				createCustomer,
				createCustomPaymentMethod,
				getCustomerSubscriptions,
				createSubscription,
				updateStripeSubscription,
				cancelSubscription,
				performPaymentConfirm,
				getCustomerPaymentMethods,
				attachPaymentMethodToCustomer,
				refundSubscriptionValue,
				setDefaultPaymentMethodToCustomer,
				sendReceiptByEmail
			}}
		>
			<StripeProviderRaw publishableKey={STRIPE_PUBLISHABLE_KEY}>
				{children}
			</StripeProviderRaw>
		</StripeContext.Provider>
	)
}
