import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { VerifiedLabelName } from '../../services/firebase/types'

import { BadgeLabel } from './styles'
import LeaderBadgeIcon from '../../assets/icons/leaderLabel.svg'
import VerifiedBadgeIcon from '../../assets/icons/verifiedLabel.svg'
import ImpactBadge from '../../assets/icons/impactLabel.svg'

interface VerifiedUserBadgeProps {
	verifiedLabel: VerifiedLabelName
}

function VerifiedUserBadge({ verifiedLabel }: VerifiedUserBadgeProps) {
	const defaultBadgeIconSize = RFValue(22)

	const userBadges: Record<VerifiedLabelName, { icon: React.ReactNode; description: string }> = {
		default: {
			icon: <VerifiedBadgeIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: RFValue(6) }} />,
			description: 'perfil verificado',
		},
		impact: {
			icon: <ImpactBadge height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: RFValue(6) }} />,
			description: 'perfil de impacto',
		},
		leader: {
			icon: <LeaderBadgeIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: RFValue(6) }} />,
			description: 'líder social',
		},
	}

	const userBadge = userBadges[verifiedLabel]

	return (
		<>
			{userBadge.icon}
			<BadgeLabel>
				{userBadge.description}
			</BadgeLabel>
		</>
	)
}

export { VerifiedUserBadge }
