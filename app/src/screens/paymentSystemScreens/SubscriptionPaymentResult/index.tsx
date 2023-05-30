import React, { useContext } from 'react'
import { Alert } from 'react-native'

import { SubscriptionContext } from '../../../contexts/SubscriptionContext'
import { EditContext } from '../../../contexts/EditContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { SubscriptionPaymentResultScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

import { theme } from '../../../common/theme'
import { Body, Container } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import SloganHashtag from '../../../assets/imgs/sloganHashtag.svg'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { SmallInstructionCard } from '../../../components/SmallInstructionCard'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { PostCard } from '../../../components/_cards/PostCard'
import { getRangeSubscriptionPlanText } from '../../../utils/subscription/commonMessages'

function SubscriptionPaymentResult({ route, navigation }: SubscriptionPaymentResultScreenProps) {
	const { subscriptionDataContext } = useContext(SubscriptionContext)
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const { subscriptionRange, subscriptionPlan, currentPost } = subscriptionDataContext

	const { successfulPayment, postReview } = route.params

	const checkPaymentData = () => {
		navigation.goBack()
	}

	const setNearRangeAsDefault = () => {
		addNewUnsavedFieldToEditContext({ range: 'near' })
		setUserDataOnContext({ subscription: { ...userDataContext.subscription, subscriptionRange: 'near' } })
		backToInitialStackScreen()
	}

	const backToInitialStackScreen = () => {
		navigation.pop(4)
	}

	const cancelPost = () => {
		Alert.alert(
			'atenção!',
			!postReview
				? 'você tem certeza que deseja desistir da assinatura?'
				: `você tem certeza que deseja descartar o post "${subscriptionDataContext.currentPost?.title}"?`,
			[
				{ text: 'Não', style: 'destructive' },
				{ text: 'Sim', onPress: () => { backToInitialStackScreen() } },
			],
			{ cancelable: false }
		)
	}

	console.log(postReview)

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
					message={successfulPayment ? 'pagamento \nrealizado com sucesso!' : 'opa, o pagamento falhou!'}
					highlightedWords={successfulPayment ? ['\nrealizado', 'com', 'sucesso!'] : ['falhou!']}
					fontSize={20}
					flex={0}
				>
					<VerticalSigh />
					<SmallInstructionCard text={getRangeSubscriptionPlanText(subscriptionRange, subscriptionPlan)} />
					<VerticalSigh />
					<SmallInstructionCard text={'r$ 20,00'} highlight error={!successfulPayment} />
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
									(currentPost && postReview) && (
										<PostCard
											owner={currentPost && currentPost.owner}
											post={currentPost}
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
									<VerticalSigh />
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
								fontSize={18}
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
