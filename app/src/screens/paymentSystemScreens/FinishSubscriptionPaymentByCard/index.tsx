/* eslint-disable camelcase */
import React, { useState, useContext } from 'react'

import { CardForm } from '@stripe/stripe-react-native'
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
		updateStripeSubscription
	} = useContext(StripeContext)

	const { subscriptionRange, subscriptionPlan, subscriptionPaymentMethod } = subscriptionDataContext

	const [isLoading, setIsLoading] = useState(false)

	const { price, priceId } = getRangePlanPrice(subscriptionRange, subscriptionPlan)

	const performSubscriptionPayment = async () => {
		try {
			setIsLoading(true)
			const { customerId, subscriptionId } = await performSubscriptionRegister()

			if (!customerId || !subscriptionId) {
				navigation.navigate('SubscriptionPaymentResult', { successfulPayment: false, ...route.params })
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
			// navigation.navigate('SubscriptionPaymentResult', { successfulPayment: false, ...route.params })
		}
	}

	// Cidade mensal - price_1Mw5MdEpbbWylPkQ23YkbLFR 35
	// Pais mensal - price_1Mw5PPEpbbWylPkQXylEhX0a 60
	// Cidade anual - price_1NJ3YFEpbbWylPkQWqvhQ3R2 315
	// Pais anual - price_1NJ3YxEpbbWylPkQFmsO9DHp 540

	const performSubscriptionRegister = async () => {
		const customerData = {
			name: userDataContext.name || 'usuário do corre.',
			customerId: userDataContext.subscription?.customerId || ''
		}

		try {
			const { error, paymentMethodId } = await createCustomPaymentMethod()
			if (error) throw new Error(error.message)

			console.log('\n')
			console.log('Método de pagamento criado...')
			console.log(`paymentMethodId: ${paymentMethodId}`)
			console.log('\n')

			let customerId = customerData.customerId || ''
			if (customerId) {
				console.log('Usuário já cadastrado...')
			} else {
				customerId = await createCustomer(customerData.name, paymentMethodId)
				console.log('Usuário cadastrado...')

				const response = await setDefaultPaymentMethodToCustomer(customerId, paymentMethodId)
				if (!response) throw new Error('Não foi possível atribuir um método de pagamento default...')
			}

			if (!customerId) throw new Error('customerId inválido')
			console.log(`customerId: ${customerId}`)
			console.log('\n')

			const subscriptionsId = await getCustomerSubscriptions(customerId)
			if (subscriptionsId) {
				await updateStripeSubscription(subscriptionsId[0], priceId)
				/* subscriptionsId.forEach(async (subscriptionId: string) => cancelSubscription(subscriptionId))
				console.log('Assinatura anterior cancelada...')
				console.log('\n') */
				console.log('Assinatura atualizada...')
			} else {
				const { subscriptionId/* , subscriptionClientSecret */ } = await createSubscription(customerId, priceId)
				console.log('Assinatura criada...')
				return { customerId, subscriptionId }
			}

			// if (!subscriptionId) throw new Error('subscriptionId inválida')
			// if (!subscriptionClientSecret) throw new Error('subscriptionClientSecret inválida')
			// console.log('Subscription criada...')
			// console.log(`subscriptionId: ${subscriptionId}`)
			// console.log(`subscriptionClientSecret: ${subscriptionClientSecret}`)
			// console.log('\n')

			/* const { error: err, paymentIntent } = await performPaymentConfirm(paymentMethodId, subscriptionClientSecret)

			if (err) throw new Error(err.message)
			console.log('Pagamento confirmado...')
			console.log('\n')
 */
			return { customerId, subscriptionId: subscriptionsId[0] }
		} catch (err) {
			console.log('Erro ao lidar com o stripe...')
			console.log(err)
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
						/* postalCodeEnabled={false}
						 countryEnabled={false} */
						onFormComplete={(cardDetails) => {
							console.log('card details', cardDetails)
						}}
						cardStyle={{
							borderWidth: 0,
							fontFamily: 'Arvo_700Bold',
						}}
						style={{ flex: 1, height: relativeScreenHeight(40), width: '100%', borderWidth: 0 }}
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
