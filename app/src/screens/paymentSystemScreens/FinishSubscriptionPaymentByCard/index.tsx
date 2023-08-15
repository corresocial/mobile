import React, { useState, useContext } from 'react'

import { CardForm } from '@stripe/stripe-react-native'
import { CardBrand } from '@stripe/stripe-react-native/lib/typescript/src/types/Token'
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFormView'
import { Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { theme } from '../../../common/theme'
import { Body, BodyScrollable, Container, PaymentStatusArea, PaymentStatusText, Title, TitleArea } from './styles'
import DollarWhiteIcon from '../../../assets/icons/dollar.svg'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

import { getRangeSubscriptionPlanText } from '../../../utils/subscription/commonMessages'
import { updateAllRangeAndLocation } from '../../../services/firebase/post/updateAllRangeAndLocation'

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
import { PostCollection, PostCollectionRemote, UserSubscription } from '../../../services/firebase/types'

type CustomCardDetails = {
	brand: CardBrand
	expiryMonth: number
	expiryYear: number
	last4: string
	complete: boolean
}

type RemoteCardDetails = {
	brand: CardBrand
	exp_month: number
	exp_year: number
	last4: string
}

function FinishSubscriptionPaymentByCard({ route, navigation }: FinishSubscriptionPaymentByCardScreenProps) {
	const { userDataContext, setUserDataOnContext, getLastUserPost } = useContext(AuthContext)
	const { subscriptionDataContext, updateUserSubscription } = useContext(SubscriptionContext)
	const {
		getRangePlanPrice,
		createCustomPaymentMethod,
		setDefaultPaymentMethodToCustomer,
		createCustomer,
		createSubscription,
		getCustomerSubscriptions,
		updateStripeSubscription,
		getCustomerPaymentMethods,
		subscriptionHasActive,
		cancelSubscription
	} = useContext(StripeContext)

	const { subscriptionRange, subscriptionPlan, subscriptionPaymentMethod } = subscriptionDataContext

	const [cardDetails, setCardDetails] = useState<CustomCardDetails>({ brand: 'Unknown', expiryMonth: 1, expiryYear: 2023, last4: '', complete: false })
	const [isLoading, setIsLoading] = useState(false)

	const editPaymentMethod = route.params?.editPaymentMethod
	const { price, priceId } = getRangePlanPrice(
		editPaymentMethod ? userDataContext.subscription?.subscriptionRange : subscriptionRange,
		editPaymentMethod ? userDataContext.subscription?.subscriptionPlan : subscriptionPlan
	)

	const performSubscriptionPayment = async () => {
		try {
			setIsLoading(true)
			const { customerId, subscriptionId, stopped } = await performSubscriptionRegister()

			if (stopped) {
				navigateToResultScreen(true, route.params)
				return
			}

			if (!customerId || !subscriptionId) {
				navigateToResultScreen(true, {})
				throw new Error('customerId ou subscriptionId inválido')
			}

			const userSubscription = {
				subscriptionRange,
				subscriptionPlan,
				subscriptionPaymentMethod,
				customerId,
				subscriptionId
			}

			await updateUserSubscription(userSubscription)
			await updateSubscriptionDependentPosts(userSubscription)
			setIsLoading(false)
			navigateToResultScreen(true, route.params)
		} catch (err: any) { // Check stripe erros
			console.log(err)
			setIsLoading(false)
			navigateToResultScreen(false, route.params)
		}
	}

	const updateSubscriptionDependentPosts = async (userSubscription: UserSubscription) => {
		const lastUserPost: PostCollection = getLastUserPost()

		const owner: PostCollection['owner'] = {
			userId: userDataContext.userId,
			name: userDataContext.name,
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

	const navigateToResultScreen = (successfulPayment: boolean, routeParams: any) => {
		navigation.navigate('SubscriptionPaymentResult', { successfulPayment, ...routeParams })
	}

	const performSubscriptionRegister = async () => {
		const customerData = {
			name: userDataContext.userId || 'usuário do corre.',
			customerId: userDataContext.subscription?.customerId || ''
		}

		try {
			let cardAlreadyRegistered = false
			if (customerData.customerId) {
				const card = await getCustomerPaymentMethods(userDataContext.subscription?.customerId || '')

				cardAlreadyRegistered = !card ? false : cardDataAreEquals(cardDetails, card)
			}

			console.log('Card details:', cardDetails)
			console.log(`Cartão já registrado: ${cardAlreadyRegistered ? 'SIM' : 'NÃO'}`)

			const { error, paymentMethodId } = await createCustomPaymentMethod()
			if (error) throw new Error(error.message)

			console.log('Método de pagamento criado...')

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

			if (editPaymentMethod) {
				if (subscriptionHasActive) {
					navigation.goBack()
					return { customerId: '', subscriptionId: '', stopped: true }
				}
			}

			let subscriptionsId = await getCustomerSubscriptions(customerId)
			!subscriptionHasActive && subscriptionsId.forEach(async (subscriptionId: string) => cancelSubscription(subscriptionId))
			!subscriptionHasActive && console.log('Assinatura anterior cancelada...')
			subscriptionsId = subscriptionHasActive ? subscriptionsId : []

			if (subscriptionsId && subscriptionsId.length) {
				await updateStripeSubscription(subscriptionsId[0], priceId)
				console.log('Assinatura atualizada...')
			} else {
				const { subscriptionId /* , subscriptionClientSecret */ } = await createSubscription(customerId, priceId)
				console.log('Assinatura criada...')
				return { customerId, subscriptionId }

				/* if (!subscriptionId) throw new Error('subscriptionId inválida') // Payment confirm
				if (!subscriptionClientSecret) throw new Error('subscriptionClientSecret inválida')
				 const { error: err, paymentIntent } = await performPaymentConfirm(paymentMethodId, subscriptionClientSecret) */
			}
			return { customerId, subscriptionId: subscriptionsId[0] }
		} catch (error: any) {
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
		if (currentCard.brand.toLowerCase() !== remoteCard.brand.toLowerCase()) return false
		if (currentCard.last4 !== remoteCard.last4) return false
		if (currentCard.expiryMonth !== remoteCard.exp_month) return false
		if (currentCard.expiryYear !== remoteCard.exp_year) return false
		return true
	}

	const saveCardDetailsOnCompleteForm = (cardData: Details) => {
		setCardDetails({
			brand: cardData.brand,
			expiryMonth: cardData.expiryMonth,
			expiryYear: cardData.expiryYear,
			last4: cardData.last4,
			complete: cardData.complete
		})
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={theme.orange2}
				relativeHeight={relativeScreenHeight(22)}
				centralized
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					message={'finalizar compra'}
					highlightedWords={['finalizar']}
					fontSize={20}
				/>
			</DefaultHeaderContainer>
			<Body behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<BodyScrollable contentContainerStyle={{ padding: RFValue(17) }} >
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
						placeholders={{
							number: 'Número do cartão',
							postalCode: 'CEP',
						}}
						// postalCodeEnabled={false} // Por que funciona???
						onFormComplete={(cardData) => saveCardDetailsOnCompleteForm(cardData)}
						cardStyle={{ fontFamily: 'Arvo_700Bold', textColor: theme.black4, placeholderColor: theme.black1 }}
						style={{ flex: 1, width: '100%', height: relativeScreenHeight(34) }}
					/>
					{
						cardDetails.complete
							? isLoading
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
							: <></>
					}
				</BodyScrollable>
			</Body>
		</Container >
	)
}

export { FinishSubscriptionPaymentByCard }
