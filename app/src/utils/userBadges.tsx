import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { VerifiedLabelName } from '../services/firebase/types'

import LeaderLabel from '../assets/icons/leaderLabel.svg'
import VerifiedLabel from '../assets/icons/verifiedLabel.svg'
import ImpactLabel from '../assets/icons/impactLabel.svg'

const defaultBadgeIconSize = RFValue(22)

const userBadges: Record<VerifiedLabelName, { icon: React.ReactNode; description: string }> = {
	default: {
		icon: <VerifiedLabel height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: RFValue(6) }} />,
		description: 'perfil verificado',
	},
	impact: {
		icon: <ImpactLabel height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: RFValue(6) }} />,
		description: 'perfil de impacto',
	},
	leader: {
		icon: <LeaderLabel height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: RFValue(6) }} />,
		description: 'líder social',
	},
}

export { userBadges }
