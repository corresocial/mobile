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

	const [isLoading, setIsLoading] = useState(false)

	const { postRange } = route.params

	const cancelSubscription = async () => {
		try {
			setIsLoading(true)
			const userSubscription: UserSubscription = {
				subscriptionRange: 'near',
				subscriptionPlan: '',
				subscriptionPaymentMethod: ''
			}

			await updateUserSubscription(userSubscription)
			setIsLoading(false)
			navigation.goBack()
		} catch (err) {
			setIsLoading(false)
		}
	}

	const editPaymentMethod = () => {
		navigation.navigate('SelectSubsciptionPaymentMethod')
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
					title={`plano ${getRangeText(postRange)}`}
					message={'estas são as opções disponíveis para o seu plano'}
					highlightedWords={[getRangeText(postRange)]}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.orange2}
				justifyContent={'center'}
			>
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.red3}
									label={'cancelar assinatura'}
									labelColor={theme.white3}
									highlightedWords={['cancelar']}
									fontSize={16}
									SvgIcon={XWhiteIcon}
									svgIconScale={['40%', '20%']}
									relativeHeight={relativeScreenHeight(10)}
									onPress={cancelSubscription}
								/>
								<VerticalSigh height={relativeScreenHeight(5)} />
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
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { EditCurrentSubscription }
