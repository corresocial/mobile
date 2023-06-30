import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '../../../contexts/AuthContext'
import { SubscriptionContext } from '../../../contexts/SubscriptionContext'
import { StripeContext } from '../../../contexts/StripeContext'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { Container } from './styles'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import AtSignWhiteIcon from '../../../assets/icons/atSign-white.svg'
import EditWhiteIcon from '../../../assets/icons/edit-white.svg'

import { getRangeText } from '../../../utils/subscription/commonMessages'
import { getTextualAddress } from '../../../utils/maps/addressFormatter'

import { PostCollection, PostCollectionRemote, UserSubscription } from '../../../services/firebase/types'
import { EditCurrentSubscriptionScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { Loader } from '../../../components/Loader'
import { updateAllRangeAndLocation } from '../../../services/firebase/post/updateAllRangeAndLocation'
import { RangeChangeConfirmationModal } from '../../../components/_modals/RangeChangeConfirmatiomModal'
import { InsertUserEmailModal } from '../../../components/_modals/InsertUserEmailModal'
import { emailIsValid } from '../../../common/auxiliaryFunctions'

function EditCurrentSubscription({ route, navigation }: EditCurrentSubscriptionScreenProps) {
	const { updateUserSubscription } = useContext(SubscriptionContext)
	const { cancelSubscription, refundSubscriptionValue, sendReceiptByEmail, updateStripeCustomer } = useContext(StripeContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [insertUserEmailModalIsVisible, setInsertUserEmailModalIsVisible] = useState(false)
	const [rangeChangeModalIsVisible, setRangeChangeModalIsVisible] = useState(false)
	const [rangeChangeConfirmationModalIsVisible, setRangeChangeConfirmationModalIsVisible] = useState(false)

	const { postRange: currentRangeSubscription, leaveFromPaidSubscription } = route.params

	const owner: PostCollection['owner'] = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const onPressCancelSubscriptionButton = () => {
		toggleRangeChangeModalVisibility()
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
			console.log(userSubscriptionId)
			console.log(customerId)
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
			console.log(error)
			console.log('Status:', error.response.status)
			console.log('Data:', error.response.data)
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

		const lastUserPost: PostCollection = getLastUserPost()

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

	const getLastUserPost = () => {
		const userPosts: PostCollection[] = userDataContext.posts || []
		const lastUserPost: PostCollection = userPosts[userPosts.length - 1]
		return lastUserPost
	}

	const getLastPostAddress = () => {
		const lastUserPost: PostCollection = getLastUserPost()
		// console.log(`last address: ${getTextualAddress(lastUserPost?.location)}`)
		return getTextualAddress(lastUserPost?.location)
	}

	const updateUserContext = (userSubscription: UserSubscription, updatedLocationPosts?: PostCollectionRemote[] | []) => {
		setUserDataOnContext({ subscription: { ...userSubscription }, posts: updatedLocationPosts })
	}

	const editPaymentMethod = () => {
		navigation.navigate('FinishSubscriptionPaymentByCard', { editPaymentMethod: true })
	}

	const getHeaderTitle = () => {
		if (leaveFromPaidSubscription) return `cancelar \nplano ${getRangeText(leaveFromPaidSubscription)}`
		return !hasError ? `plano ${getRangeText(currentRangeSubscription)}` : 'opa'
	}

	const getHeaderDescription = () => {
		if (leaveFromPaidSubscription) return `tem certeza que quer cancelar seu plano ${getRangeText(leaveFromPaidSubscription)} e voltar para plano região?`
		return !hasError ? 'estas são as opções disponíveis para o seu plano' : 'algo deu errado, \ntente novamente'
	}

	const getHeaderHighlightedWords = () => {
		if (leaveFromPaidSubscription) return ['cancelar', 'cancelar', 'seu', 'plano', getRangeText(leaveFromPaidSubscription), 'e', 'voltar', 'para', 'plano', 'região']
		return !hasError ? [getRangeText(currentRangeSubscription)] : ['opa', 'algo', 'deu', 'errado']
	}

	const saveUserEmail = async (email?: string) => {
		try {
			setHasError(true)
			if (!email || !emailIsValid(email) || !userDataContext.subscription?.customerId) throw new Error('Email Inválido')

			setIsLoading(true)
			await sendReceiptByEmail(userDataContext.subscription?.customerId || '', email)
			await updateStripeCustomer(userDataContext.subscription?.customerId, { email })
			await updateUserSubscription({ ...userDataContext.subscription, receiptEmail: email })
			setIsLoading(false)
			navigation.goBack()
		} catch (error: any) {
			console.log('Erro ao lidar com o stripe...')
			if (error.response) {
				console.log(error)
				console.log('Status:', error.response.status)
				console.log('Data:', error.response.data)
			}
			setHasError(true)
			setIsLoading(false)
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
			<InsertUserEmailModal // Second confirmation
				initialInputValue={userDataContext.subscription?.receiptEmail || ''}
				visibility={insertUserEmailModalIsVisible}
				onPressButton={saveUserEmail}
				closeModal={toggleInsertUserEmailModalVisibility}
			/>
			<DefaultHeaderContainer
				relativeHeight={'45%'}
				centralized
				backgroundColor={theme.white3}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={16}
					backgroundColor={!hasError ? theme.white3 : theme.red1}
					title={getHeaderTitle()}
					message={getHeaderDescription()}
					highlightedWords={getHeaderHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.orange2}
				justifyContent={'center'}
			>
				{
					isLoading && !hasError
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.red3}
									keyboardHideButton={false}
									label={leaveFromPaidSubscription ? `cancelar plano ${getRangeText(leaveFromPaidSubscription)}` : 'cancelar assinatura'}
									labelColor={theme.white3}
									highlightedWords={leaveFromPaidSubscription ? ['cancelar', getRangeText(leaveFromPaidSubscription)] : ['cancelar']}
									fontSize={16}
									SvgIcon={XWhiteIcon}
									svgIconScale={['40%', '20%']}
									relativeHeight={relativeScreenHeight(10)}
									onPress={onPressCancelSubscriptionButton}
								/>
								<VerticalSigh height={relativeScreenHeight(3)} />
								{
									!leaveFromPaidSubscription && (
										<>
											<PrimaryButton
												color={theme.green3}
												keyboardHideButton={false}
												label={'receber recibo por e-mail'}
												labelColor={theme.white3}
												highlightedWords={['recibo', 'por', 'e-mail']}
												fontSize={16}
												SecondSvgIcon={AtSignWhiteIcon}
												svgIconScale={['40%', '20%']}
												relativeHeight={relativeScreenHeight(10)}
												onPress={toggleInsertUserEmailModalVisibility}
											/>
											<VerticalSigh height={relativeScreenHeight(3)} />
											<PrimaryButton
												color={theme.white3}
												keyboardHideButton={false}
												label={'mudar forma \nde pagamento'}
												highlightedWords={['pagamento']}
												fontSize={16}
												SecondSvgIcon={EditWhiteIcon}
												svgIconScale={['40%', '20%']}
												relativeHeight={relativeScreenHeight(10)}
												onPress={editPaymentMethod}
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
