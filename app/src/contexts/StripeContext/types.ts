import { ReactElement } from 'react'

import { PostRange } from '@domain/post/entity/types'
import { SubscriptionPlan } from '@domain/user/entity/types'

import { CustomerData, StripeProducts } from '@services/stripe/types'

export interface StripeContextProps {
	children: ReactElement
}

export interface StripeContextState {
	stripeProductsPlans: StripeProducts
	subscriptionHasActive: boolean,
	getRangePlanPrice: (subscriptionRange?: PostRange, subscriptionPlan?: SubscriptionPlan) => ({ price: string, priceId: string })
	createCustomer: (name: string, paymentMethodId: string, userTrial?: boolean) => Promise<any>
	getCustomerPaymentMethods: (customerId: string) => Promise<any>
	updateStripeCustomer: (customerId: string, customerData: CustomerData) => Promise<void>
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
