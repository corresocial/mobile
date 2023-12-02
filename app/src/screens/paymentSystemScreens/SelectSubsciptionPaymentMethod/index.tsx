import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import { ButtonsContainer } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

import { SelectSubsciptionPaymentMethodScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SubscriptionPaymentMethod } from '../../../services/firebase/types'

import { SubscriptionContext } from '../../../contexts/SubscriptionContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { StripeContext } from '../../../contexts/StripeContext'
import { UiPresentationUtils } from '../../../utils-ui/UiPresentationUtils'

const { getRangeSubscriptionLabelHighlighted } = UiPresentationUtils()

function SelectSubsciptionPaymentMethod({ route, navigation }: SelectSubsciptionPaymentMethodScreenProps) {
	const { subscriptionDataContext, setSubscriptionDataOnContext } = useContext(SubscriptionContext)
	const { getRangePlanPrice } = useContext(StripeContext)

	const { subscriptionRange, subscriptionPlan } = subscriptionDataContext

	const navigateToPaymentScreen = (subscriptionPaymentMethod: SubscriptionPaymentMethod) => {
		setSubscriptionDataOnContext({ subscriptionPaymentMethod })

		if (subscriptionPaymentMethod === 'pix') {
			navigation.navigate('FinishSubscriptionPaymentByPix', { postReview: !!route.params?.postReview })
			return
		}

		navigation.navigate('FinishSubscriptionPaymentByCard', { postReview: !!route.params?.postReview, ...route.params })
	}

	const { price } = getRangePlanPrice(subscriptionRange, subscriptionPlan)

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(18)}
				centralized
				backgroundColor={theme.white3}
				footerText={getRangeSubscriptionLabelHighlighted(subscriptionRange, subscriptionPlan)}
				footerTextHighlighted={`r$ ${price},00`}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'qual a forma de pagamento?'}
					highlightedWords={['forma', 'de', 'pagamento']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.orange2}>
				<ButtonsContainer>
					{/* <OptionButton
						color={theme.white1}
						label={'usar pix'}
						highlightedWords={['pix']}
						labelSize={18}
						relativeHeight={'18%'}
						SvgIcon={PixWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.green3}
						leftSideWidth={'28%'}
						onPress={() => Alert.alert('Em breve...')}
					// onPress={() => navigateToPaymentScreen('pix')}
					/> */}
					<OptionButton
						color={theme.white3}
						label={'cartão de crédito'}
						highlightedWords={['crédito']}
						labelSize={18}
						relativeHeight={'18%'}
						SvgIcon={CardWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.green3}
						leftSideWidth={'28%'}
						onPress={() => navigateToPaymentScreen('creditCard')}
					/>
					{/* <OptionButton
						color={theme.white1}
						label={'cartão de débito'}
						highlightedWords={['débito']}
						labelSize={18}
						relativeHeight={'18%'}
						SvgIcon={CardWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.green3}
						leftSideWidth={'28%'}
						onPress={() => Alert.alert('Em breve...')}
					// onPress={() => navigateToPaymentScreen('debitCard')}
					/> */}
				</ButtonsContainer>
			</FormContainer>
		</>
	)
}

export { SelectSubsciptionPaymentMethod }
