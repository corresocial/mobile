import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import PixWhiteIcon from '../../../assets/icons/pix-white.svg'
import CardWhiteIcon from '../../../assets/icons/card-white.svg'

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
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectSubsciptionPaymentMethod({ route, navigation }: SelectSubsciptionPaymentMethodScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const postRange: PostRange | any = 'near' // Route or context // TODO Type
	const subscriptionPlan: SubscriptionPlan | any = 'monthly' // Route or context // TODO Type

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const navigateToFinishSale = (subscriptionPaymentMethod: SubscriptionPaymentMethod) => {
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
				relativeHeight={relativeScreenHeight(18)}
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
					<OptionButton
						color={theme.white3}
						label={'usar pix'}
						highlightedWords={['pix']}
						labelSize={18}
						relativeHeight={'18%'}
						SvgIcon={PixWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.green3}
						leftSideWidth={'28%'}
						onPress={() => navigateToFinishSale('pix')}
					/>
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
						onPress={() => navigateToFinishSale('pix')}
					/>
					<OptionButton
						color={theme.white3}
						label={'cartão de débito'}
						highlightedWords={['débito']}
						labelSize={18}
						relativeHeight={'18%'}
						SvgIcon={CardWhiteIcon}
						svgIconScale={['50%', '50%']}
						leftSideColor={theme.green3}
						leftSideWidth={'28%'}
						onPress={() => navigateToFinishSale('pix')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</>
	)
}

export { SelectSubsciptionPaymentMethod }
