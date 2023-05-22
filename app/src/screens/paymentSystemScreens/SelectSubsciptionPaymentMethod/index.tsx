import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { SelectSubsciptionPaymentMethodScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SubscriptionPaymentMethod, PostRange, SubscriptionPlan } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { ButtonsContainer } from './styles'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'

function SelectSubsciptionPaymentMethod({ route, navigation }: SelectSubsciptionPaymentMethodScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const postRange: PostRange | any = 'near' // Route or context // TODO Type
	const subscriptionPlan: SubscriptionPlan | any = 'monthly' // Route or context // TODO Type

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSubscriptionPaymentMethod = (subscriptionPaymentMethod: SubscriptionPaymentMethod) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ subscriptionPaymentMethod })
			navigation.goBack()
		}

		// setSocialImpactDataOnContext({ subscriptionPaymentMethod })
		// navigation.navigate('')
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
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(15)}
				centralized
				backgroundColor={theme.white3}
				footerText={getRelativePostRangeText()}
				footerTextHighlighted={'r$ 20,00'}
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

					{/* <PrimaryButton
						color={theme.green3}
						label={'continuar'}
						labelColor={theme.white3}
						SecondSvgIcon={CheckWhiteIcon}
						onPress={() => { }}
					/> */}
				</ButtonsContainer>
			</FormContainer>
		</>
	)
}

export { SelectSubsciptionPaymentMethod }
