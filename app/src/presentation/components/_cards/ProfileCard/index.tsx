import React, { useEffect, useState } from 'react'

import { CompleteUser } from '@domain/user/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import {
	Container,
	ContainerInner,
	DescriptionContainer,
	LeftArea,
	RightArea,
	RightAreaLimits,
	SidePicture,
	UserDescription,
	UserName,
	WaitingApproveIconContainer
} from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

const { arrayIsEmpty } = UiUtils()

interface ProfileCardProps {
	userData: CompleteUser
	isOwner: boolean
	onPress: () => void
}

function ProfileCard({ userData, isOwner, onPress }: ProfileCardProps) {
	const [user, setUser] = useState<CompleteUser>(userData)
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	useEffect(() => {
		if (isOwner && user && user.unapprovedData) {
			setUser({ description: '...', ...(userData || {}), ...userData.unapprovedData })
		}
	}, [userData, isOwner])

	const getProfilePictureUrl = () => {
		if (!user || !user.profilePictureUrl) return null
		if (arrayIsEmpty(user.profilePictureUrl)) return null
		return user.profilePictureUrl[0]
	}

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress()
	}

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner
				style={{ marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0 }}
			>
				<LeftArea>
					{
						<SidePicture
							source={getProfilePictureUrl() ? { uri: getProfilePictureUrl() || defaultUserProfilePicture } : { uri: defaultUserProfilePicture }}
							recyclingKey={getProfilePictureUrl() ? getProfilePictureUrl() : ''}
							placeholder={'U1T7N2={fQ={~AjtfQjtfQfQfQfQ~AjtfQjt'}
							placeholderContentFit={'contain'}
							cachePolicy={'memory-disk'}
							transition={200}
							contentFit={'cover'}
						>
							{
								userData.unapprovedData && isOwner && (
									<WaitingApproveIconContainer >
										<ClockArrowWhiteIcon />
									</WaitingApproveIconContainer>
								)
							}
						</SidePicture>
					}
				</LeftArea>
				<RightArea >
					<RightAreaLimits>
						<UserName numberOfLines={2}>
							{user.name}
						</UserName>
						<DescriptionContainer>
							<UserDescription numberOfLines={2}>
								{user.description}
							</UserDescription>
						</DescriptionContainer>
					</RightAreaLimits>
				</RightArea>
			</ContainerInner>
		</Container >
	)
}

export { ProfileCard }
