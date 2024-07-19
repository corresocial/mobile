import React from 'react'

import { UserOwner } from '@domain/user/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import { OwnerDataContainer, OwnerName, OwnerProfilePicture, OwnerProfileTouchable, OwnerTextGroup, PostDate } from './styles'

const { formatRelativeDate } = UiUtils()

interface MiniUserIndentifierProps {
	owner: UserOwner
	postedAt: Date
	navigateToProfile?: () => void
}

function MiniUserIndentifier({ owner, postedAt, navigateToProfile }: MiniUserIndentifierProps) {
	const getOwnerPicture = (): string => {
		return owner.profilePictureUrl?.[0] || defaultUserProfilePicture
	}

	const buttonHandler = () => {
		navigateToProfile && navigateToProfile()
	}

	return (
		<OwnerDataContainer>
			<OwnerProfileTouchable activeOpacity={1} onPress={buttonHandler}>
				<OwnerProfilePicture source={{ uri: getOwnerPicture() }} />
			</OwnerProfileTouchable>
			<OwnerTextGroup>
				<OwnerName>{owner.name}</OwnerName>
				<PostDate>{`postado em ${formatRelativeDate(postedAt)}`}</PostDate>
			</OwnerTextGroup>
		</OwnerDataContainer>
	)
}

export { MiniUserIndentifier }
