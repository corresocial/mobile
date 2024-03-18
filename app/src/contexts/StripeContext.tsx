/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native'
import React, { useContext, createContext, useEffect, useState } from 'react'

import { StripeProvider as StripeProviderRaw, confirmPayment, createPaymentMethod } from '@stripe/stripe-react-native'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Id } from '@domain/entities/globalTypes'

import { cacheRequestConfig } from '@data/cache/methods/requests'

import { UserStackNavigationProps } from '../presentation/routes/Stack/UserStack/types'
import { PostCollection, PostCollectionRemote, PostRange, SubscriptionPlan, UserSubscription } from '@services/firebase/types'
import { CustomerData, StripeProducts } from '@services/stripe/types'

import { updateAllRangeAndLocation } from '@services/firebase/post/updateAllRangeAndLocation'
import { getStripePlans, getStripeProducts } from '@services/stripe/products'

import { SubscriptionAlertModal } from '@components/_modals/SubscriptionAlertModal'

import { getEnvVars } from '../infrastructure/environment'
import { dateHasExpired } from '../presentation/common/auxiliaryFunctions'
import { AuthContext } from './AuthContext'
import { SubscriptionContext } from './SubscriptionContext'

interface StripeContextProps {
	children: React.ReactElement
}

interface StripeContextState {
	stripeProductsPlans: StripeProducts
	subscriptionHasActive: boolean,
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: string, priceId: string })
	createCustomer: (name: string, paymentMethodId: string, userTrial?: boolean) => Promise<any>
	getCustomerPaymentMethods: (customerId: string) => Promise<any>
	updateStripeCustomer: (customerId: string, customerData: CustomerData) => Promise<any> // TODO Type
	createCustomPaymentMethod: () => Promise<any>
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => Promise<any>
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string, attach?: boolean) => Promise<any>
	getCustomerSubscriptions: (customerId: string) => Promise<any>
	createSubscription: (customerId: string, priceId: string, freeTrial?: boolean) => Promise<any>
	updateStripeSubscription: (subscriptionId: string, priceId: string) => Promise<any>
	cancelSubscription: (subscriptionId: string) => Promise<any>
	refundSubscriptionValue: (customerId: string, subscriptionId: string) => Promise<any>
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => Promise<any>
	sendReceiptByEmail: (customerId: string, email: string) => Promise<any>
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
	createCustomer: (name: string, paymentMethodId: string, userTrial?: boolean) => new Promise(() => { }),
	getCustomerPaymentMethods: (customerId: string) => new Promise(() => { }),
	updateStripeCustomer: (customerId: string, customerData: CustomerData) => new Promise(() => { }),
	createCustomPaymentMethod: () => new Promise(() => { }),
	attachPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	setDefaultPaymentMethodToCustomer: (customerId: string, paymentMethodId: string) => new Promise(() => { }),
	getCustomerSubscriptions: (customerId: string) => new Promise(() => { }),
	createSubscription: (customerId: string, priceId: string, freeTrial?: boolean) => new Promise(() => { }),
	updateStripeSubscription: (subscriptionId: string, priceId: string) => new Promise(() => { }),
	cancelSubscription: (subscriptionId: string) => new Promise(() => { }),
	refundSubscriptionValue: (customerId: string, subscriptionId: string) => new Promise(() => { }),
	performPaymentConfirm: (paymentMethodId: string, subscriptionClientSecret: string) => new Promise(() => { }),
	sendReceiptByEmail: (customerId: string, email: string) => new Promise(() => { }),
})

const { STRIPE_PUBLISHABLE_KEY, STRIPE_API_URL, STRIPE_SECRET_KEY } = getEnvVars()

const defaultAxiosHeader = {
	'Content-Type': 'application/x-www-form-urlencoded',
	Authorization: `bearer ${STRIPE_SECRET_KEY}`
}

const axiosConfig = { headers: { ...defaultAxiosHeader } }

export function StripeProvider({ children }: StripeContextProps) {
	const { updateUserSubscription } = useContext(SubscriptionContext)
	const { userDataContext, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)

	const [stripeProductsPlans, setStripeProductsPlans] = useState<StripeProducts>(defaultStripeProducts)
	const [subscriptionHasActive, setSubscriptionHasActive] = useState(true)

	const [invalidSubscriptionAlertModalIsVisible, setSubscriptionAlertModalIsVisible] = useState(false)
	const [numberOfSubscriptionExpiredDays, setNumberOfSubscriptionExpiredDays] = useState(0)

	const navigation = useNavigation<UserStackNavigationProps>()

	const stripeProductsQuery = useQuery({
		queryKey: ['stripe.products'],
		queryFn: () => getStripeProducts(),
		staleTime: cacheRequestConfig.stripeProducts.persistenceTime,
		gcTime: cacheRequestConfig.stripeProducts.persistenceTime
	})

	useEffect(() => {
		getProducts()
		if (userHasSubscription()) {
			checkCurrentSubscriptionStatus()
		}
	}, [])

	async function getProducts() {
		try {
			const { data: stripeProducts } = (stripeProductsQuery && stripeProductsQuery.data) ? stripeProductsQuery : await stripeProductsQuery.refetch()
			const remoteStripeProductsPlans = await getStripePlans(stripeProducts)

			setStripeProductsPlans(remoteStripeProductsPlans)
			console.log('STRIPE: Produtos do Stripe obtidos com sucesso!')
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

		if (response.data && !response.data.length) return false

		return response.data.data.length > 0 ? response.data.data[0] : null
	}

	async function updateStripeCustomer(customerId: string, customerData: CustomerData) {
		await axios.post(
			`${STRIPE_API_URL}/customers/${customerId}`,
			{ ...customerData },
			axiosConfig
		)
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

	async function createCustomer(name: string, paymentMethodId: string, userTrial?: boolean) {
		const customerData = {
			name,
			description: 'Assinante do corre',
			phone: '',
			email: '',
			address: {},
			payment_method: paymentMethodId,
		} as CustomerData

		if (userTrial) delete customerData.payment_method

		const result = await axios.post(`${STRIPE_API_URL}/customers`, { ...customerData }, axiosConfig)
		const customerId = result.data.id
		return customerId
	}

	const checkCurrentSubscriptionStatus = async () => {
		try {
			const customerId = userDataContext.subscription?.customerId
			if (!customerId) return

			const freeSubscription = await getCustomerSubscriptions(customerId, true, true)
			const paidSubscription = await getCustomerSubscriptions(customerId, true)
			if ((!paidSubscription || !paidSubscription.length) && (!freeSubscription || !freeSubscription.length)) {
				showSubscriptionAlertWithCustomMessage(10, true)
				throw new Error('Não há faturas ativas')
			}

			const endSubscriptionDate = paidSubscription && paidSubscription.length ? paidSubscription[0].current_period_end * 1000 : freeSubscription[0].current_period_end * 1000
			const currentDate = Math.floor(Date.now()) //  + 2596000000 + (0 * 86400000)

			/* console.log(new Date(currentDate))
			console.log(new Date(endSubscriptionDate)) */

			if (dateHasExpired(currentDate, endSubscriptionDate, 1)) {
				const numberOfExpiredDays = dateHasExpired(currentDate, endSubscriptionDate, 7, true)
				console.log(`STRIPE: Dias expirados: ${numberOfExpiredDays} dias`)
				showSubscriptionAlertWithCustomMessage(numberOfExpiredDays as number)
				setSubscriptionHasActive(false)
			} else {
				console.log('STRIPE: Fatura em dia')
				setSubscriptionHasActive(true)
			}
		} catch (err: any) {
			console.log(err)
			console.log('STRIPE: A assinatura está com problemas')
			setSubscriptionHasActive(false)
		}
	}

	// Abstrair

	const handleCancelSubscription = async (alreadyCanceled?: boolean) => {
		try {
			const userSubscriptionId = userDataContext.subscription?.subscriptionId || ''
			const customerId = userDataContext.subscription?.customerId || ''

			if (userSubscriptionId && customerId) {
				!alreadyCanceled && await cancelSubscription(userSubscriptionId)
				await updateSubscriptionRange()
				setSubscriptionHasActive(true)
				return
			}
			throw new Error('O usuário não possui nenhuma assinatura no momento')
		} catch (error: any) {
			console.log(error)
			console.log('Status:', error.response.status)
			console.log('Data:', error.response.data)
		}
	}

	const updateSubscriptionRange = async () => {
		const userSubscription: UserSubscription = {
			customerId: userDataContext.subscription?.customerId,
			subscriptionId: '',
			subscriptionRange: 'near',
			subscriptionPlan: '',
			subscriptionPaymentMethod: ''
		}

		await updateUserSubscription(userSubscription)
		await updateSubscriptionDependentPosts(userSubscription)
		setSubscriptionHasActive(true)
	}

	const updateSubscriptionDependentPosts = async (userSubscription: UserSubscription) => {
		const lastUserPost: PostCollection = getLastUserPost()

		const owner: PostCollection['owner'] = {
			userId: userDataContext.userId as Id,
			name: userDataContext.name as string,
			profilePictureUrl: userDataContext.profilePictureUrl
		}

		if (!lastUserPost) return
		const userPostsUpdated = await updateAllRangeAndLocation(
			owner as any, // TODO Type
			userDataContext.posts || [],
			{
				range: 'near',
				location: lastUserPost.location
			},
			true
		)

		updateUserContext(userSubscription, userPostsUpdated as any[]) // TODO Type
	}

	const updateUserContext = (userSubscription: UserSubscription, updatedLocationPosts?: PostCollectionRemote[] | []) => {
		setUserDataOnContext({ subscription: { ...userSubscription }, posts: updatedLocationPosts })
	}

	// Abstrair ˆˆˆ

	const showSubscriptionAlertWithCustomMessage = async (numberOfExpiredDays: number, alreadyCanceled?: boolean) => {
		if (numberOfExpiredDays <= 7) {
			setNumberOfSubscriptionExpiredDays(numberOfExpiredDays as number)
		}

		if (numberOfExpiredDays > 7) {
			await handleCancelSubscription(alreadyCanceled)
			setNumberOfSubscriptionExpiredDays(numberOfExpiredDays as number)
		}

		toggleInvalidSubscriptionModalVisibility()
	}

	const userHasSubscription = () => userDataContext.subscription && userDataContext.subscription.subscriptionRange !== 'near'

	async function getCustomerSubscriptions(customerId: string, returnLastSubscriptionData?: boolean, requestTrialSubscriptions?: boolean) {
		const response = requestTrialSubscriptions
			? (
				await axios.get(`${STRIPE_API_URL}/subscriptions`, {
					params: {
						customer: customerId,
						status: 'trialing',
					},
					...axiosConfig
				}))
			: (
				await axios.get(`${STRIPE_API_URL}/subscriptions`, {
					params: {
						customer: customerId,
						status: 'active',
					},
					...axiosConfig
				})
			)

		const subscriptionsId = response.data.data.length > 0
			? returnLastSubscriptionData
				? response.data.data
				: response.data.data.map((subscription: any) => subscription.id) // TODO Type
			: null

		setSubscriptionHasActive(true)
		return subscriptionsId
	}

	async function createSubscription(customerId: string, priceId: string, freeTrial?: boolean) { // CARD 4000000760000002
		const trialEndDate = Math.round((Date.now() / 1000)) + 31650000
		const freeTrialParams = freeTrial
			? { trial_end: trialEndDate } // 15/07/2024 23:59
			: {}

		const postData = {
			customer: customerId,
			items: [
				{
					price: priceId, // Substitua pelo ID real do preço/produto
				},
			],
			...freeTrialParams,
			payment_behavior: 'error_if_incomplete', // error_if_incomplete
			expand: ['latest_invoice.payment_intent'],
		}

		const response = await axios.post(`${STRIPE_API_URL}/subscriptions`, postData, axiosConfig)

		const subscriptionId = response.data.id
		const subscriptionClientSecret = response.data.latest_invoice && response.data.latest_invoice.payment_intent && response.data.latest_invoice.payment_intent.client_secret

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

	const sendReceiptByEmail = async (customerId: string, email: string) => {
		const query = `customer: '${customerId}' AND status: 'succeeded'`
		const result = await axios.get(`${STRIPE_API_URL}/charges/search?query=${encodeURIComponent(query)}`, axiosConfig)

		const receiptUrl = result.data.data[0].receipt_url
		const chargeId = result.data.data[0].id

		const emailOptions = {
			receipt_email: email,
		}

		const res = await axios.post(`${STRIPE_API_URL}/charges/${chargeId}`, emailOptions, axiosConfig)
		console.log('Charges atualizadas...')
		console.log(`Último recibo: ${receiptUrl}`)
		console.log(`New Email: ${res.data.receipt_email}`)
		return receiptUrl
	}

	const toggleInvalidSubscriptionModalVisibility = () => {
		setSubscriptionAlertModalIsVisible(!invalidSubscriptionAlertModalIsVisible)
	}

	const navigateToEditCurrentPlanScreen = () => {
		navigation.navigate('Configurations') // TODO Type
		navigation.navigate('SelectSubscriptionRange')
	}

	return (
		<StripeContext.Provider
			value={{
				stripeProductsPlans: stripeProductsPlans as StripeProducts,
				subscriptionHasActive,
				getRangePlanPrice,
				createCustomer,
				updateStripeCustomer,
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
			<SubscriptionAlertModal
				numberOfExpiredDays={numberOfSubscriptionExpiredDays}
				visibility={invalidSubscriptionAlertModalIsVisible}
				closeModal={toggleInvalidSubscriptionModalVisibility}
				onPressButton={navigateToEditCurrentPlanScreen}
			/>
			<StripeProviderRaw publishableKey={STRIPE_PUBLISHABLE_KEY}>
				{children}
			</StripeProviderRaw>
		</StripeContext.Provider>
	)
}
