import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { Container } from './styles'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import EditWhiteIcon from '../../../assets/icons/edit-white.svg'

import { getRangeText } from '../../../utils/subscription/commonMessages'

import { UserSubscription } from '../../../services/firebase/types'
import { EditCurrentSubscriptionScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { Loader } from '../../../components/Loader'

function EditCurrentSubscription({ route, navigation }: EditCurrentSubscriptionScreenProps) {
	const { updateUserSubscription } = useContext(SubscriptionContext)

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { postRange, leaveFromPaidSubscription } = route.params

	const cancelSubscription = async () => {
		try {
			setIsLoading(true)
			setHasError(false)
			const userSubscription: UserSubscription = {
				subscriptionRange: 'near',
				subscriptionPlan: '',
				subscriptionPaymentMethod: ''
			}

			await updateUserSubscription(userSubscription)
			setIsLoading(false)
			navigation.goBack()
		} catch (err) {
			setHasError(true)
			setIsLoading(false)
		}
	}

	const editPaymentMethod = () => {
		navigation.navigate('SelectSubsciptionPaymentMethod')
	}

	const getHeaderTitle = () => {
		if (leaveFromPaidSubscription) return `cancelar \nplano ${getRangeText(leaveFromPaidSubscription)}`
		return !hasError ? `plano ${getRangeText(postRange)}` : 'opa'
	}

	const getHeaderDescription = () => {
		if (leaveFromPaidSubscription) return `tem certeza que quer cancelar seu plano ${getRangeText(leaveFromPaidSubscription)} e voltar para plano região?`
		return !hasError ? 'estas são as opções disponíveis para o seu plano' : 'algo deu errado ao cancelar assinatura, \ntente novamente'
	}

	const getHeaderHighlightedWords = () => {
		if (leaveFromPaidSubscription) return ['cancelar', 'cancelar', 'seu', 'plano', getRangeText(leaveFromPaidSubscription), 'e', 'voltar', 'para', 'plano', 'região']
		return !hasError ? [getRangeText(postRange)] : ['opa', 'algo', 'deu', 'errado', 'ao', 'cancelar']
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
									label={leaveFromPaidSubscription ? `cancelar plano ${getRangeText(leaveFromPaidSubscription)}` : 'cancelar assinatura'}
									labelColor={theme.white3}
									highlightedWords={leaveFromPaidSubscription ? ['cancelar', getRangeText(leaveFromPaidSubscription)] : ['cancelar']}
									fontSize={16}
									SvgIcon={XWhiteIcon}
									svgIconScale={['40%', '20%']}
									relativeHeight={relativeScreenHeight(10)}
									onPress={cancelSubscription}
								/>
								<VerticalSigh height={relativeScreenHeight(5)} />
								{
									!leaveFromPaidSubscription && (
										<PrimaryButton
											color={theme.white3}
											label={'mudar forma \nde pagamento'}
											highlightedWords={['pagamento']}
											fontSize={16}
											SecondSvgIcon={EditWhiteIcon}
											svgIconScale={['40%', '20%']}
											relativeHeight={relativeScreenHeight(10)}
											onPress={editPaymentMethod}
										/>
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
