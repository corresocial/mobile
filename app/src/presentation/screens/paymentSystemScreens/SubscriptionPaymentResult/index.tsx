import React, { useContext, useEffect } from 'react'
import { Alert, BackHandler } from 'react-native'

import { PostEntityCommonFields } from '@domain/post/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { StripeContext } from '@contexts/StripeContext'
import { SubscriptionContext } from '@contexts/SubscriptionContext'

import { SubscriptionPaymentResultScreenProps } from '@routes/Stack/UserStack/screenProps'

import { UiSubscriptionUtils } from '@utils-ui/subscription/UiSubscriptionUtils'

import { Body, Container } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import SloganHashtag from '@assets/imgs/sloganHashtag.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { PostCard } from '@components/_cards/PostCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { SmallInstructionCard } from '@components/SmallInstructionCard'

const { getRangeSubscriptionLabelHighlighted } = UiSubscriptionUtils()

function SubscriptionPaymentResult({ route, navigation }: SubscriptionPaymentResultScreenProps) {
	const { subscriptionDataContext, currentPostOnSubscription } = useContext(SubscriptionContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)
	const { getRangePlanPrice } = useContext(StripeContext)

	const { subscriptionRange, subscriptionPlan } = subscriptionDataContext

	const { successfulPayment, postReview, editPaymentMethod } = route.params

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	})

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			backToInitialStackScreen()
			return true
		}
		return false
	}

	const checkPaymentData = () => {
		navigation.goBack()
	}

	const setNearRangeAsDefault = () => {
		addNewUnsavedFieldToEditContext({ range: 'near' })
		setUserDataOnContext({ subscription: { ...userDataContext.subscription, subscriptionRange: 'near' } })
		backToInitialStackScreen()
	}

	const backToInitialStackScreen = () => {
		if (editPaymentMethod) return navigation.pop(2)
		navigation.pop(4)
	}

	const cancelPost = () => {
		Alert.alert(
			'atenção!',
			!postReview
				? 'você tem certeza que deseja desistir da assinatura?'
				: 'você tem certeza que deseja descartar o post?',
			[
				{ text: 'Não', style: 'destructive' },
				{ text: 'Sim', onPress: () => { backToInitialStackScreen() } },
			],
			{ cancelable: false }
		)
	}

	const getResultTitle = () => {
		if (editPaymentMethod) return successfulPayment ? 'cartão \natualizado com sucesso!' : 'opa, atualização do cartão falhou!'
		return successfulPayment ? 'pagamento \nrealizado com sucesso!' : 'opa, o pagamento falhou!'
	}

	const { price } = getRangePlanPrice(
		editPaymentMethod ? userDataContext.subscription?.subscriptionRange : subscriptionRange,
		editPaymentMethod ? userDataContext.subscription?.subscriptionPlan : subscriptionPlan
	)

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={successfulPayment ? theme.orange1 : theme.red1} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				backgroundColor={successfulPayment ? theme.orange1 : theme.red1}
				relativeHeight={successfulPayment ? relativeScreenHeight(80) : relativeScreenHeight(50)}
				borderBottomWidth={successfulPayment ? 0 : 5}
				flexDirection={'column'}
				justifyContent={successfulPayment ? 'space-around' : 'center'}
			>
				<InstructionCard
					message={getResultTitle()}
					highlightedWords={successfulPayment ? ['\nrealizado', '\natualizado', 'com', 'sucesso!'] : ['falhou!']}
					fontSize={20}
					flex={0}
				>
					<VerticalSpacing />
					<SmallInstructionCard text={getRangeSubscriptionLabelHighlighted(subscriptionRange, subscriptionPlan)} />
					<VerticalSpacing />
					<SmallInstructionCard text={`r$ ${price},00`} highlight error={!successfulPayment} />
				</InstructionCard>
				{
					!successfulPayment
						? (
							<InstructionCard
								message={'não conseguimos completar o pagamento, tente conferir os dados e pagar novamente.'}
								highlightedWords={['não', 'conseguimos', 'completar', 'o', 'pagamento']}
								backgroundColor={theme.red2}
								fontSize={14}
								lineHeight={16}
								flex={0}
							/>
						)
						: <></>
				}
				{
					successfulPayment
						? (
							<>
								{
									(currentPostOnSubscription && postReview) && (
										<PostCard
											owner={currentPostOnSubscription && currentPostOnSubscription.owner as PostEntityCommonFields['owner']}
											post={currentPostOnSubscription}
											onPress={() => { }}
										/>
									)
								}

								<InstructionCard
									message={'obrigado por usar nosso aplicativo! \n\njuntos, vamos conectar todos a um futuro melhor'}
									highlightedWords={['\n\njuntos', 'vamos', 'conectar', 'todos', 'a', 'um', 'futuro', 'melhor']}
									backgroundColor={theme.orange3}
									fontSize={14}
									flex={0}
								>
									<VerticalSpacing />
									<SloganHashtag width={relativeScreenWidth(75)} height={relativeScreenWidth(10)} />
								</InstructionCard>
							</>
						)
						: <></>
				}
			</DefaultHeaderContainer>

			<Body>
				{
					successfulPayment
						? (
							<PrimaryButton
								color={theme.green3}
								label={!postReview ? 'finalizar' : 'ir para o post'}
								highlightedWords={['ir', 'para', 'o', 'post']}
								fontSize={17}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={backToInitialStackScreen}
							/>
						)
						: (
							<>
								<PrimaryButton
									color={theme.green3}
									label={'conferir dados'}
									highlightedWords={['conferir', 'dados']}
									labelColor={theme.white3}
									relativeHeight={relativeScreenHeight(11)}
									fontSize={16}
									SecondSvgIcon={DescriptionWhiteIcon}
									onPress={checkPaymentData}
								/>
								{
									postReview && (
										<PrimaryButton
											color={theme.yellow3}
											label={'usar alcance região \n(gratuito)'}
											highlightedWords={['alcance', 'região']}
											labelColor={theme.black4}
											relativeHeight={relativeScreenHeight(11)}
											textAlign={'center'}
											fontSize={16}
											SecondSvgIcon={PinWhiteIcon}
											onPress={setNearRangeAsDefault}
										/>
									)
								}
								<PrimaryButton
									color={theme.red3}
									label={!postReview ? 'cancelar alterações' : 'cancelar postagem'}
									highlightedWords={['cancelar']}
									labelColor={theme.white3}
									relativeHeight={relativeScreenHeight(11)}
									fontSize={16}
									SvgIcon={XWhiteIcon}
									onPress={cancelPost}
								/>
							</>
						)
				}
			</Body>
		</Container >
	)
}

export { SubscriptionPaymentResult }
