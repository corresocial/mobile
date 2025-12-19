/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native'
import React, { useContext, createContext, useEffect, useState } from 'react'

import { StripeProvider as StripeProviderRaw, confirmPayment, createPaymentMethod } from '@stripe/stripe-react-native'
import { useQueryClient } from '@tanstack/react-query'

import { PostRange } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'
import { SubscriptionPlan, UserSubscription } from '@domain/user/entity/types'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { UserStackNavigationProps } from '../../presentation/routes/Stack/UserStack/types'
import { CustomerData, StripeProducts } from '@services/stripe/types'

import { firebaseFunctions } from '@infrastructure/firebase'
import { getStripePlans, getStripeProducts } from '@services/stripe/products'

import { SubscriptionAlertModal } from '@components/_modals/SubscriptionAlertModal'

import { getEnvVars } from '../../infrastructure/environment'
import { dateHasExpired } from '../../presentation/common/auxiliaryFunctions'
import { useAuthContext } from '../AuthContext'
import { SubscriptionContext } from '../SubscriptionContext'

const { updateLocationDataOnPosts } = usePostDomain()

interface StripeContextProps {
	children: React.ReactElement
}

interface StripeContextState {
	stripeProductsPlans: StripeProducts
	subscriptionHasActive: boolean,
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: string, priceId: string })
	createCustomer: (name: string, paymentMethodId: string, userTrial?: boolean) => Promise<any>
	getCustomerPaymentMethods: (customerId: string) => Promise<any>
	updateStripeCustomer: (customerId: string, customerData: CustomerData) => Promise<any>
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

const initialValue = {
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
}

export const StripeContext = createContext<StripeContextState>(initialValue)

const { STRIPE_PUBLISHABLE_KEY, FIREBASE_CLOUD_URL } = getEnvVars()

export function StripeProvider({ children }: StripeContextProps) {
	const { updateUserSubscription } = useContext(SubscriptionContext)
	const { userDataContext, setUserDataOnContext, updateUserPost, getLastUserPost } = useAuthContext()

	const queryClient = useQueryClient()
	const { executeCachedRequest } = useCacheRepository()

	const [stripeProductsPlans, setStripeProductsPlans] = useState<StripeProducts>(defaultStripeProducts)
	const [subscriptionHasActive, setSubscriptionHasActive] = useState(true)

	const [invalidSubscriptionAlertModalIsVisible, setSubscriptionAlertModalIsVisible] = useState(false)
	const [numberOfSubscriptionExpiredDays, setNumberOfSubscriptionExpiredDays] = useState(0)

	const navigation = useNavigation<UserStackNavigationProps>()

	useEffect(() => {
		getProducts()
		if (userHasSubscription()) {
			checkCurrentSubscriptionStatus()
		}
	}, [])

	const callBackend = async (endpoint: string, data?: any, method: 'GET' | 'POST' | 'DELETE' = 'POST') => {
		const action = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
		const stripeApi = firebaseFunctions.httpsCallable('stripeApi')
		const payload = { action, ...data }
		const response = await stripeApi(payload)
		return response as any
	}

	async function getProducts() {
		try {
			const queryKey = ['stripe.products']
			const stripeProducts = await executeCachedRequest(
				queryClient,
				queryKey,
				async () => getStripeProducts()
			)
			const remoteStripeProductsPlans = await getStripePlans(stripeProducts)

			setStripeProductsPlans(remoteStripeProductsPlans)
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
		const response = await callBackend('/payment-methods', { customer: customerId }, 'GET')
		if (response.data && !response.data.data.length) return false
		return response.data.data.length > 0 ? response.data.data[0] : null
	}

	async function updateStripeCustomer(customerId: string, customerData: CustomerData) {
		await callBackend('/update-customer', { ...customerData })
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
		await callBackend('/attach-payment-method', { paymentMethodId })
		return true
	}

	async function setDefaultPaymentMethodToCustomer(customerId: string, paymentMethodId: string, attach?: boolean) {
		attach && await attachPaymentMethodToCustomer(customerId, paymentMethodId)
		await callBackend('/set-default-payment-method', { paymentMethodId })
		return true
	}

	async function createCustomer(name: string, paymentMethodId: string, userTrial?: boolean) {
		// Backend creates customer based on Auth token.
		const result = await callBackend('/create-customer')
		const { customerId } = result.data

		// We need to attach the payment method separately now
		if (paymentMethodId && !userTrial) {
			await attachPaymentMethodToCustomer(customerId, paymentMethodId)
			await setDefaultPaymentMethodToCustomer(customerId, paymentMethodId)
		}

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
			const currentDate = Math.floor(Date.now())

			if (dateHasExpired(currentDate, endSubscriptionDate, 1)) {
				const numberOfExpiredDays = dateHasExpired(currentDate, endSubscriptionDate, 7, true)
				console.log(`STRIPE: Dias expirados: ${numberOfExpiredDays} dias`)
				showSubscriptionAlertWithCustomMessage(numberOfExpiredDays as number)
				setSubscriptionHasActive(false)
			} else {
				setSubscriptionHasActive(true)
			}
		} catch (err: any) {
			console.log(err)
			console.log('STRIPE: A assinatura está com problemas')
			setSubscriptionHasActive(false)
		}
	}

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
			console.log('Status:', error.response?.status)
			console.log('Data:', error.response?.data)
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
		const lastUserPost = getLastUserPost()

		if (!lastUserPost) return
		const userPostsUpdated = await updateLocationDataOnPosts(
			userDataContext.userId,
			{ range: 'near', location: lastUserPost.location },
			true
		)

		updateUserPost(userPostsUpdated)
		setUserDataOnContext({ subscription: { ...userSubscription } })
	}

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
		const status = requestTrialSubscriptions ? 'trialing' : 'active'
		const response = await callBackend('/subscriptions', { customer: customerId, status }, 'GET')

		const subscriptionsId = response.data.data.length > 0
			? returnLastSubscriptionData
				? response.data.data
				: response.data.data.map((subscription: any) => subscription.id)
			: null

		setSubscriptionHasActive(true)
		return subscriptionsId
	}

	async function createSubscription(customerId: string, priceId: string, freeTrial?: boolean) {
		const response = await callBackend('/create-subscription', { priceId, freeTrial })

		// Backend returns { subscriptionId, clientSecret }
		const { subscriptionId, clientSecret } = response.data

		return { subscriptionId, subscriptionClientSecret: clientSecret }
	}

	async function updateStripeSubscription(subscriptionId: string, priceId: string) {
		await callBackend('/update-subscription', { subscriptionId, priceId })
	}

	async function cancelSubscription(subscriptionId: string) {
		const response = await callBackend('/cancel-subscription', { subscriptionId })
		setSubscriptionHasActive(true)
		return response.data
	}

	async function refundSubscriptionValue(customerId: string, subscriptionId: string) {
		try {
			await callBackend('/refund-last-payment')
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
		const res = await callBackend('/send-receipt', { email })
		const receiptUrl = res.data.receipt_url

		console.log('Charges atualizadas...')
		console.log(`Último recibo: ${receiptUrl}`)
		console.log(`New Email: ${res.data.receipt_email}`)
		return receiptUrl
	}

	const toggleInvalidSubscriptionModalVisibility = () => {
		setSubscriptionAlertModalIsVisible(!invalidSubscriptionAlertModalIsVisible)
	}

	const navigateToEditCurrentPlanScreen = () => {
		navigation.navigate('HomeTab', {
			screen: 'ProfileStack',
			params: {
				screen: 'SelectSubscriptionRange',
				params: {
					editMode: true,
					initialValue: 'value'
				}
			}
		} as any)
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
