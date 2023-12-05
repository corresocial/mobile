import React from 'react'

import { PostRange } from '@services/firebase/types'

import CountryWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { CustomModal } from '../CustomModal'

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
			<VerticalSpacing />
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
			<VerticalSpacing />
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
