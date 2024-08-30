import React from 'react'

import { VerifiedLabelName } from '@domain/user/entity/types'

import { BadgeLabel } from './styles'
import ImpactBadge from '@assets/icons/impactLabel.svg'
import LeaderBadgeIcon from '@assets/icons/leaderLabel.svg'
import VerifiedCitizenRegistrationIcon from '@assets/icons/questionary-white.svg'
import VerifiedBadgeIcon from '@assets/icons/verifiedLabel.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface VerifiedUserBadgeProps {
	verifiedLabel: VerifiedLabelName
}

function VerifiedUserBadge({ verifiedLabel }: VerifiedUserBadgeProps) {
	const defaultBadgeIconSize = relativeScreenDensity(22)

	const userBadges: Record<VerifiedLabelName, { icon: React.ReactNode; description: string }> = {
		default: {
			icon: <VerifiedBadgeIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: relativeScreenDensity(6) }} />,
			description: 'perfil verificado',
		},
		impact: {
			icon: <ImpactBadge height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: relativeScreenDensity(6) }} />,
			description: 'perfil de impacto',
		},
		leader: {
			icon: <LeaderBadgeIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: relativeScreenDensity(6) }} />,
			description: 'líder social',
		},
		government: {
			icon: <VerifiedBadgeIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: relativeScreenDensity(6) }} />,
			description: 'perfil governamental',
		},
		coordinator: {
			icon: <VerifiedCitizenRegistrationIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: relativeScreenDensity(6) }} />,
			description: 'coordenador',
		},
		questionnaireAdministrator: {
			icon: <VerifiedCitizenRegistrationIcon height={defaultBadgeIconSize} width={defaultBadgeIconSize} style={{ marginRight: relativeScreenDensity(6) }} />,
			description: 'aplicador de questionário',
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
