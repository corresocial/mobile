import React from 'react'
import { theme } from '../../../common/theme'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import CountryWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { CustomModal } from '../CustomModal'
import { VerticalSigh } from '../../VerticalSigh'
import { PostRange } from '../../../services/firebase/types'
import { OptionButton } from '../../_buttons/OptionButton'

interface SelectSubscriptionPlanModalProps {
	visibility: boolean
	closeModal: () => void
	onSelectPlan: (subscriptionRange: PostRange) => void
}

function SelectSubscriptionPlanModal({ visibility, closeModal, onSelectPlan }: SelectSubscriptionPlanModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'qual plano?'}
			closeButton
			closeModal={closeModal}
		>
			<VerticalSigh />
			<OptionButton
				color={theme.white3}
				label={'cidade'}
				highlightedWords={['cidade']}
				labelSize={16}
				SvgIcon={CityWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.orange3}
				leftSideWidth={'28%'}
				onPress={() => onSelectPlan('city')}
			/>
			<VerticalSigh />
			<OptionButton
				color={theme.white3}
				label={'país'}
				highlightedWords={['país']}
				labelSize={16}
				SvgIcon={CountryWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.orange3}
				leftSideWidth={'28%'}
				onPress={async () => onSelectPlan('country')}
			/>
		</CustomModal>
	)
}

export { SelectSubscriptionPlanModal }
