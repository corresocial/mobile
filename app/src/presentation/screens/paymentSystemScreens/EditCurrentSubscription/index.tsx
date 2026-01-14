import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { usePostDomain } from '@domain/post/usePostDomain'
import { UserSubscription } from '@domain/user/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { StripeContext } from '@contexts/StripeContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { EditCurrentSubscriptionScreenProps } from '@routes/Stack/UserStack/screenProps'

import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { UiSubscriptionUtils } from '@utils-ui/subscription/UiSubscriptionUtils'

import { Container } from './styles'
import AtSignWhiteIcon from '@assets/icons/atSign-white.svg'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { emailIsValid } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { InsertUserEmailModal } from '@components/_modals/InsertUserEmailModal'
import { RangeChangeConfirmationModal } from '@components/_modals/RangeChangeConfirmatiomModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'

const { remoteStorage } = useUserRepository()

const { updateLocationDataOnPosts } = usePostDomain()

const { getPostRangeLabel } = UiSubscriptionUtils()
const { getTextualAddress } = UiLocationUtils()

function EditCurrentSubscription({ route, navigation }: EditCurrentSubscriptionScreenProps) {
	const { updateUserSubscription } = useContext(SubscriptionContext)
	const { cancelSubscription, refundSubscriptionValue, sendReceiptByEmail, updateStripeCustomer, getStripeCustomer } = useContext(StripeContext)
	const { userDataContext, updateUserPost, userPostsContext, setUserDataOnContext, getLastUserPost } = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [insertUserEmailModalIsVisible, setInsertUserEmailModalIsVisible] = useState(false)
	const [rangeChangeModalIsVisible, setRangeChangeModalIsVisible] = useState(false)
	const [rangeChangeConfirmationModalIsVisible, setRangeChangeConfirmationModalIsVisible] = useState(false)

	const [privateEmail, setPrivateEmail] = useState('')

	const { postRange: currentRangeSubscription, leaveFromPaidSubscription } = route.params

	useEffect(() => {
		loadPrivateEmail()
	}, [])

	const loadPrivateEmail = async () => {
		const stripeCustomer = await getStripeCustomer()
		setPrivateEmail(stripeCustomer && stripeCustomer.email ? stripeCustomer.email : '')
	}

	const userHasAnyPost = () => {
		return userPostsContext && userPostsContext.length
	}

	const onPressCancelSubscriptionButton = () => {
		if (userHasAnyPost()) {
			toggleRangeChangeModalVisibility()
			return
		}
		toggleRangeChangeConfirmationModalVisibility()
	}

	const toggleRangeChangeModalVisibility = () => {
		setRangeChangeModalIsVisible(!rangeChangeModalIsVisible)
	}

	const toggleRangeChangeConfirmationModalVisibility = () => {
		setRangeChangeConfirmationModalIsVisible(!rangeChangeConfirmationModalIsVisible)
	}

	const toggleInsertUserEmailModalVisibility = () => {
		setInsertUserEmailModalIsVisible(!insertUserEmailModalIsVisible)
	}

	const handleCancelSubscription = async () => {
		try {
			setIsLoading(true)
			setHasError(false)

			const userSubscriptionId = userDataContext.subscription?.subscriptionId || ''
			const customerId = userDataContext.subscription?.customerId || ''

			if (userSubscriptionId && customerId) {
				await refundSubscriptionValue(customerId, userSubscriptionId)
				await cancelSubscription(userSubscriptionId)
				await updateSubscriptionRange()
				setIsLoading(false)
				navigation.goBack()
				return
			}
			throw new Error('O usuário não possui nenhuma assinatura no momento')
		} catch (error: any) {
			console.error('Erro ao cancelar assinatura:', error)
			setHasError(true)
			setIsLoading(false)
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
	}

	const updateSubscriptionDependentPosts = async (userSubscription: UserSubscription) => {
		console.log(`${currentRangeSubscription} --> near`)

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

	const getLastPostAddress = () => {
		const lastUserPost = getLastUserPost()
		if (!lastUserPost) return ''
		return getTextualAddress(lastUserPost.location)
	}

	const editPaymentMethod = () => {
		navigation.navigate('FinishSubscriptionPaymentByCard', { editPaymentMethod: true })
	}

	const getHeaderTitle = () => {
		if (leaveFromPaidSubscription) return `cancelar \nplano ${getPostRangeLabel(leaveFromPaidSubscription)}`
		return !hasError ? `plano ${getPostRangeLabel(currentRangeSubscription)}` : 'opa'
	}

	const getHeaderDescription = () => {
		if (leaveFromPaidSubscription) return `tem certeza que quer cancelar seu plano ${getPostRangeLabel(leaveFromPaidSubscription)} e voltar para plano região?`
		return !hasError ? 'estas são as opções disponíveis para o seu plano' : 'algo deu errado, \ntente novamente'
	}

	const getHeaderHighlightedWords = () => {
		if (leaveFromPaidSubscription) return ['cancelar', 'cancelar', 'seu', 'plano', getPostRangeLabel(leaveFromPaidSubscription), 'e', 'voltar', 'para', 'plano', 'região']
		return !hasError ? [getPostRangeLabel(currentRangeSubscription)] : ['opa', 'algo', 'deu', 'errado']
	}

	const saveUserEmail = async (email?: string) => {
		try {
			if (!email || !emailIsValid(email) || !userDataContext.subscription?.customerId) throw new Error('Email Inválido')

			setIsLoading(true)
			await sendReceiptByEmail(userDataContext.subscription?.customerId || '', email)
			await updateStripeCustomer(userDataContext.subscription?.customerId, { email })
			await remoteStorage.updatePrivateContacts(
				userDataContext.userId,
				{ email }
			)
			await updateUserSubscription({ ...userDataContext.subscription/* , receiptEmail: email  */ })
			setIsLoading(false)
			navigation.goBack()
		} catch (error: any) {
			console.error('Erro ao lidar com o stripe:', error)
			setHasError(true)
			setIsLoading(false)
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<RangeChangeConfirmationModal
				visibility={rangeChangeModalIsVisible}
				currentPostAddress={getLastPostAddress()}
				newRangeSelected={'near'}
				onPressButton={toggleRangeChangeConfirmationModalVisibility}
				closeModal={toggleRangeChangeModalVisibility}
			/>
			<RangeChangeConfirmationModal // Second confirmation
				visibility={rangeChangeConfirmationModalIsVisible}
				currentPostAddress={getLastPostAddress()}
				newRangeSelected={'near'}
				confirmation
				onPressButton={handleCancelSubscription}
				closeModal={toggleRangeChangeConfirmationModalVisibility}
			/>
			<InsertUserEmailModal
				initialInputValue={privateEmail}
				visibility={insertUserEmailModalIsVisible}
				onPressButton={saveUserEmail}
				closeModal={toggleInsertUserEmailModalVisibility}
			/>
			<DefaultHeaderContainer
				relativeHeight={'45%'}
				centralized
				backgroundColor={theme.colors.white[3]}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={16}
					backgroundColor={!hasError ? theme.colors.white[3] : theme.colors.red[1]}
					title={getHeaderTitle()}
					message={getHeaderDescription()}
					highlightedWords={getHeaderHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.colors.orange[2]}
				justifyContent={'center'}
			>
				{
					isLoading && !hasError
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.colors.red[3]}
									keyboardHideButton={false}
									label={leaveFromPaidSubscription ? `cancelar plano ${getPostRangeLabel(leaveFromPaidSubscription)}` : 'cancelar assinatura'}
									labelColor={theme.colors.white[3]}
									highlightedWords={leaveFromPaidSubscription ? ['cancelar', getPostRangeLabel(leaveFromPaidSubscription)] : ['cancelar']}
									fontSize={16}
									SvgIcon={XWhiteIcon}
									svgIconScale={['40%', '20%']}
									relativeHeight={relativeScreenHeight(10)}
									onPress={onPressCancelSubscriptionButton}
								/>
								<VerticalSpacing height={3} />
								<PrimaryButton
									color={theme.colors.white[3]}
									keyboardHideButton={false}
									label={'mudar forma \nde pagamento'}
									highlightedWords={['pagamento']}
									fontSize={16}
									SecondSvgIcon={EditWhiteIcon}
									svgIconScale={['40%', '20%']}
									relativeHeight={relativeScreenHeight(10)}
									onPress={editPaymentMethod}
								/>
								{
									!leaveFromPaidSubscription && (
										<>
											<VerticalSpacing height={3} />
											<PrimaryButton
												color={theme.colors.green[3]}
												keyboardHideButton={false}
												label={'receber recibo por e-mail'}
												labelColor={theme.colors.white[3]}
												highlightedWords={['recibo', 'por', 'e-mail']}
												fontSize={16}
												SecondSvgIcon={AtSignWhiteIcon}
												svgIconScale={['40%', '20%']}
												relativeHeight={relativeScreenHeight(10)}
												onPress={toggleInsertUserEmailModalVisibility}
											/>

										</>
									)
								}
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { EditCurrentSubscription }
