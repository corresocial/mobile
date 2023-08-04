import React from 'react'
import { theme } from '../../../common/theme'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import CountryWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { CustomModal } from '../CustomModal'
import { VerticalSigh } from '../../VerticalSigh'
import { PostRange } from '../../../services/firebase/types'

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
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.orange3}
				labelColor={theme.white3}
				label={'cidade'}
				highlightedWords={['cidade']}
				fontSize={16}
				SvgIcon={CityWhiteIcon}
				svgIconScale={['40%', '25%']}
				onPress={async () => onSelectPlan('city')}
			/>
			<VerticalSigh />
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.orange3}
				labelColor={theme.white3}
				label={'país'}
				highlightedWords={['país']}
				fontSize={16}
				SvgIcon={CountryWhiteIcon}
				svgIconScale={['40%', '25%']}
				onPress={() => onSelectPlan('country')}
			/>
		</CustomModal>
	)
}

export { SelectSubscriptionPlanModal }
