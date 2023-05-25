import React from 'react'

import { theme } from '../../../common/theme'
import { Body, Container } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import SloganHashtag from '../../../assets/imgs/sloganHashtag.svg'

import { SubscriptionPaymentResultScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { PostRange, SubscriptionPlan } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { SmallInstructionCard } from '../../../components/SmallInstructionCard'
import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { PostCard } from '../../../components/_cards/PostCard'

function SubscriptionPaymentResult({ route, navigation }: SubscriptionPaymentResultScreenProps) {
	const postRange: PostRange | any = 'near' // Route or context // TODO Type
	const subscriptionPlan: SubscriptionPlan | any = 'monthly' // Route or context // TODO Type

	const successfulPayment = !!route.params.successfulPayment

	const checkPaymentData = () => {
		navigation.goBack()
	}

	const getRelativePostRangeText = () => {
		const subscriptionPlanText = getRelativeSubscriptionPlanText()
		switch (postRange) {
			case 'near': return showMessageWithHighlight(`plano região${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['região', subscriptionPlanText])
			case 'city': return showMessageWithHighlight(`plano cidade${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['cidade', subscriptionPlanText])
			case 'country': return showMessageWithHighlight(`plano país${subscriptionPlanText && ` - ${subscriptionPlanText}`}`, ['país', subscriptionPlanText])
			default: return showMessageWithHighlight('plano não definido', ['não', 'definido'])
		}
	}

	const getRelativeSubscriptionPlanText = () => {
		switch (subscriptionPlan) {
			case 'monthly': return 'mensal'
			case 'yearly': return 'anual'
			default: return ''
		}
	}

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
					<SmallInstructionCard text={getRelativePostRangeText()} />
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
								<PostCard
									owner={{ name: 'a', profilePictureUrl: '', userId: 1 }}
									post={{ description: 'a', title: 'title', saleValue: '20', postId: 2, postType: 'service' }}
									onPress={() => { }}
								/>

								<InstructionCard
									message={'obrigado por usar nosso aplicativo! \n\njuntos, vamos conectar todos a um futuro melhor'}
									highlightedWords={['\n\njuntos', 'vamos', 'conectar', 'todos', 'a', 'um', 'futuro', 'melhor']}
									backgroundColor={theme.orange3}
									fontSize={14}
									flex={0}
								>
									<VerticalSigh />
									<SloganHashtag width={relativeScreenWidth(70)} height={relativeScreenWidth(10)} />
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
								label={'ir para o post'}
								highlightedWords={['ir', 'para', 'o', 'post']}
								fontSize={18}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={() => { }}
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
								<PrimaryButton
									color={theme.yellow3}
									label={'usar alcance região \n(gratuito)'}
									highlightedWords={['alcance', 'região']}
									labelColor={theme.black4}
									relativeHeight={relativeScreenHeight(11)}
									textAlign={'center'}
									fontSize={16}
									SecondSvgIcon={PinWhiteIcon}
									onPress={() => { }}
								/>
								<PrimaryButton
									color={theme.red3}
									label={'cancelar postagem'}
									highlightedWords={['cancelar']}
									labelColor={theme.white3}
									relativeHeight={relativeScreenHeight(11)}
									fontSize={16}
									SvgIcon={XWhiteIcon}
									onPress={() => { }}
								/>
							</>
						)
				}
			</Body>
		</Container >
	)
}

export { SubscriptionPaymentResult }
