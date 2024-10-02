import React, { useState } from 'react'

import { UserOwner } from '@domain/user/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import { OwnerDataContainer, OwnerName, OwnerProfilePicture, OwnerProfileTouchable, OwnerTextGroup, PostDate, UserPictureArea, UserPictureAreaInner } from './styles'
import UserShadow from '@assets/imgs/user_shadow.jpg'
import { relativeScreenDensity } from '@common/screenDimensions'

const { formatRelativeDate } = UiUtils()

interface MiniUserIndentifierProps {
	owner: UserOwner
	postedAt: Date
	userPictureShadow?: boolean
	navigateToProfile?: () => void
}

function MiniUserIndentifier({ owner, postedAt, userPictureShadow, navigateToProfile }: MiniUserIndentifierProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		navigationHandler()
	}

	const getOwnerPicture = (): string => {
		return owner.profilePictureUrl?.[0] || defaultUserProfilePicture
	}

	const navigationHandler = () => {
		navigateToProfile && navigateToProfile()
	}

	return (
		<OwnerDataContainer>
			{
				userPictureShadow ? (
					<UserPictureArea>
						<UserPictureAreaInner
							style={{ left: buttonPressed ? 0 : relativeScreenDensity(-4) }}
							activeOpacity={1}
							onPressIn={pressingButton}
							onPressOut={notPressingButton}
							onPress={releaseButton}
						>
							<OwnerProfilePicture
								source={{ uri: getOwnerPicture() || defaultUserProfilePicture }}
								recyclingKey={getOwnerPicture() || defaultUserProfilePicture}
								placeholder={UserShadow}
								placeholderContentFit={'cover'}
								contentFit={'cover'}
								cachePolicy={'memory-disk'}
							/>
						</UserPictureAreaInner>
					</UserPictureArea>

				) : (
					<OwnerProfileTouchable activeOpacity={1} onPress={navigationHandler}>
						<OwnerProfilePicture contentFit={'cover'} source={{ uri: getOwnerPicture() }} />
					</OwnerProfileTouchable>
				)
			}
			<OwnerTextGroup>
				<OwnerName numberOfLines={2}>{owner.name}</OwnerName>
				<PostDate>{`${formatRelativeDate(postedAt)}`}</PostDate>
			</OwnerTextGroup>
		</OwnerDataContainer>
	)
}

export { MiniUserIndentifier }
