/* eslint-disable camelcase */
import React, { useState, useContext } from 'react'

import { CardForm } from '@stripe/stripe-react-native'
import { CardBrand } from '@stripe/stripe-react-native/lib/typescript/src/types/Token'
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFormView'
import { theme } from '../../../common/theme'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

import { getRangeSubscriptionPlanText } from '../../../utils/subscription/commonMessages'

import { FinishSubscriptionPaymentByCardScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { SubscriptionContext } from '../../../contexts/SubscriptionContext'
import { StripeContext } from '../../../contexts/StripeContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'
import { SmallInstructionCard } from '../../../components/SmallInstructionCard'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { Loader } from '../../../components/Loader'

type CustomCardDetails = {
	brand: CardBrand
	expiryMonth: number
	expiryYear: number
	last4: string
}

type RemoteCardDetails = {
	brand: CardBrand
	exp_month: number
	exp_year: number
	last4: string
}

function FinishSubscriptionPaymentByCard({ route, navigation }: FinishSubscriptionPaymentByCardScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { subscriptionDataContext, updateUserSubscription } = useContext(SubscriptionContext)
	const {
		getRangePlanPrice,
		createCustomPaymentMethod,
		setDefaultPaymentMethodToCustomer,
		createCustomer,
		createSubscription,
		getCustomerSubscriptions,
		updateStripeSubscription,
		getCustomerPaymentMethods
	} = useContext(StripeContext)

	const { subscriptionRange, subscriptionPlan, subscriptionPaymentMethod } = subscriptionDataContext

	const [cardDetails, setCardDetails] = useState<CustomCardDetails>({ brand: 'Unknown', expiryMonth: 1, expiryYear: 2023, last4: '' })
	const [isLoading, setIsLoading] = useState(false)

	const { price, priceId } = getRangePlanPrice(subscriptionRange, subscriptionPlan)
	const editPaymentMethod = route.params?.editPaymentMethod

	const performSubscriptionPayment = async () => {
		try {
			setIsLoading(true)
			const { customerId, subscriptionId, stopped } = await performSubscriptionRegister()

			if (stopped) {
				navigation.navigate('SubscriptionPaymentResult', { successfulPayment: true, ...route.params })
				return
			}

			if (!customerId || !subscriptionId) {
				navigation.navigate('SubscriptionPaymentResult', { successfulPayment: false })
				throw new Error('customerId ou subscriptionId inválido')
			}

			console.log(`customerId: ${customerId}`)
			console.log(`subscriptionId: ${subscriptionId}`)

			const userSubscription = {
				subscriptionRange,
				subscriptionPlan,
				subscriptionPaymentMethod,
				customerId,
				subscriptionId
			}

			await updateUserSubscription(userSubscription)

			setIsLoading(false)
			navigation.navigate('SubscriptionPaymentResult', { successfulPayment: true, ...route.params })
		} catch (err: any) { // Veirfy stripe erros
			console.log(err)
			setIsLoading(false)
			navigation.navigate('SubscriptionPaymentResult', { successfulPayment: false, ...route.params })
		}
	}

	// Cidade mensal - price_1Mw5MdEpbbWylPkQ23YkbLFR 35
	// Pais mensal - price_1Mw5PPEpbbWylPkQXylEhX0a 60
	// Cidade anual - price_1NJ3YFEpbbWylPkQWqvhQ3R2 315
	// Pais anual - price_1NJ3YxEpbbWylPkQFmsO9DHp 540

	const performSubscriptionRegister = async () => {
		const customerData = {
			name: `${userDataContext.name}-${userDataContext.userId}` || 'usuário do corre.',
			customerId: userDataContext.subscription?.customerId || ''
		}

		try {
			let cardAlreadyRegistered = false
			if (customerData.customerId) {
				const { card: remoteCard } = await getCustomerPaymentMethods(userDataContext.subscription?.customerId || '')
				cardAlreadyRegistered = cardDataAreEquals(cardDetails, remoteCard)
			}
			console.log(`cardAlreadyRegistered - ${cardAlreadyRegistered}`)

			const { error, paymentMethodId } = await createCustomPaymentMethod()
			if (error) throw new Error(error.message)

			console.log('\n')
			console.log('Método de pagamento criado...')
			console.log(`paymentMethodId: ${paymentMethodId}`)
			console.log('\n')

			let customerId = customerData.customerId || ''
			if (customerId) {
				console.log('Usuário já cadastrado...')

				if (!cardAlreadyRegistered) {
					const response = await setDefaultPaymentMethodToCustomer(customerId, paymentMethodId, true)
					if (!response) throw new Error('Não foi possível atribuir um método de pagamento default...')
				}
			} else {
				customerId = await createCustomer(customerData.name, paymentMethodId)
				console.log('Usuário cadastrado...')

				await updateUserSubscription({ ...userDataContext.subscription, customerId })

				const response = await setDefaultPaymentMethodToCustomer(customerId, paymentMethodId)
				if (!response) throw new Error('Não foi possível atribuir um método de pagamento default...')
			}

			if (!customerId) throw new Error('customerId inválido')
			console.log(`customerId: ${customerId}`)
			console.log('\n')

			if (editPaymentMethod) {
				navigation.goBack()
				return { customerId: '', subscriptionId: '', stopped: true }
			}

			const subscriptionsId = await getCustomerSubscriptions(customerId)
			if (subscriptionsId) {
				await updateStripeSubscription(subscriptionsId[0], priceId)
				console.log('Assinatura atualizada...')
			} else {
				const { subscriptionId /* , subscriptionClientSecret */ } = await createSubscription(customerId, priceId)
				console.log('Assinatura criada...')
				return { customerId, subscriptionId }

				/* if (!subscriptionId) throw new Error('subscriptionId inválida')
				if (!subscriptionClientSecret) throw new Error('subscriptionClientSecret inválida')
				console.log('Subscription criada...')
				console.log(`subscriptionId: ${subscriptionId}`)
				console.log(`subscriptionClientSecret: ${subscriptionClientSecret}`)
				console.log('\n')
				 const { error: err, paymentIntent } = await performPaymentConfirm(paymentMethodId, subscriptionClientSecret) */
			}

			/*
						if (err) throw new Error(err.message)
						console.log('Pagamento confirmado...')
						console.log('\n')
			 */
			return { customerId, subscriptionId: subscriptionsId[0] }
		} catch (error: any) {
			console.log('Erro ao lidar com o stripe...')
			console.log(error)
			if (error.response) {
				console.log('Status:', error.response.status)
				console.log('Data:', error.response.data)
				console.log('Headers:', error.response.headers)
				throw new Error(error)
			}
			return {}
		}
	}

	const renderPaymentStatus = () => {
		return showMessageWithHighlight(
			`adicionar \ncartão de ${subscriptionDataContext.subscriptionPaymentMethod === 'creditCard'
				? 'crédito'
				: 'débito'}`,
			['adicionar']
		)
	}

	const cardDataAreEquals = (currentCard: CustomCardDetails, remoteCard: RemoteCardDetails) => {
		console.log(`${currentCard.brand} - ${remoteCard.brand}`)
		if (currentCard.brand.toLowerCase() !== remoteCard.brand.toLowerCase()) return false
		console.log(`${currentCard.last4} - ${remoteCard.last4}`)
		if (currentCard.last4 !== remoteCard.last4) return false
		console.log(`${currentCard.expiryMonth} - ${remoteCard.exp_month}`)
		if (currentCard.expiryMonth !== remoteCard.exp_month) return false
		console.log(`${currentCard.expiryYear} - ${remoteCard.exp_year}`)
		if (currentCard.expiryYear !== remoteCard.exp_year) return false
		return true
	}

	const saveCardDetailsOnCompleteForm = (cardData: Details) => {
		console.log('Card details', cardData)
		setCardDetails({
			brand: cardData.brand,
			expiryMonth: cardData.expiryMonth,
			expiryYear: cardData.expiryYear,
			last4: cardData.last4
		})
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={theme.orange2}
				relativeHeight={relativeScreenHeight(16)}
				centralized
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					message={'finalizar compra'}
					highlightedWords={['finalizar']}
					fontSize={20}
				/>
			</DefaultHeaderContainer>
			<BodyScrollable >
				<Body >
					<TitleArea>
						<DollarWhiteIcon width={30} height={30} />
						<Title>{showMessageWithHighlight('resumo de valores', ['resumo'])}</Title>
					</TitleArea>
					<SmallInstructionCard text={getRangeSubscriptionPlanText(subscriptionRange, subscriptionPlan)} />
					<VerticalSigh />
					<SmallInstructionCard text={`r$ ${price},00`} highlight />

					<PaymentStatusArea>
						<SmallButton
							color={theme.green3}
							onPress={() => { }}
							SvgIcon={CardWhiteIcon}
							svgScale={['60%', '60%']}
							height={relativeScreenHeight(7)}
							relativeWidth={relativeScreenHeight(10)}
						/>
						<PaymentStatusText>{renderPaymentStatus()}</PaymentStatusText>
					</PaymentStatusArea>
					<CardForm
						/*  postalCodeEnabled={false}
						 countryEnabled={false} */
						onFormComplete={(cardData) => saveCardDetailsOnCompleteForm(cardData)}
						cardStyle={{
							borderWidth: 0,
							fontFamily: 'Arvo_700Bold',
							borderRadius: 20,
						}}
						style={{
							flex: 1,
							height: relativeScreenHeight(40),
							width: '100%',
						}}
					/>
					{
						isLoading
							? <Loader />
							: (
								<PrimaryButton
									color={theme.green3}
									label={'usar cartão'}
									highlightedWords={['cartão']}
									fontSize={18}
									labelColor={theme.white3}
									SecondSvgIcon={CardWhiteIcon}
									onPress={performSubscriptionPayment}
								/>
							)
					}
				</Body>
			</BodyScrollable>
		</Container >
	)
}

export { FinishSubscriptionPaymentByCard }
