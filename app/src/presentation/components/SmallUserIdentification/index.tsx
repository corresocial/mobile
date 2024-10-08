import React, { useState } from 'react'

import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import {
	Container,
	MiniaturePortrait,
	UserInfo,
	UserName,
	UserPictureArea,
	PostDateTime,
	UserPictureAreaInner,
	HorizontalUserInfo,
	UsernameTimeContainer
} from './styles'
import LeaderSealWhiteIcon from '@assets/icons/leaderLabel.svg'
import UserShadow from '@assets/imgs/user_shadow.jpg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface SmallUserIdentificationProps {
	width?: string | number
	height?: string | number
	userName: string | undefined
	postDate?: string
	profilePictureUrl?: string | null
	showLeaderSeal?: boolean
	pictureDimensions?: number
	userNameFontSize?: number
	postDateFontSize?: number
	navigateToProfile?: () => void
}

function SmallUserIdentification({
	width = '100%',
	height,
	userName = 'usuário do corre.',
	postDate,
	profilePictureUrl,
	showLeaderSeal,
	pictureDimensions = 35,
	userNameFontSize = 12,
	postDateFontSize = 12,
	navigateToProfile
}: SmallUserIdentificationProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		navigateToProfile && navigateToProfile()
	}

	return (
		<Container style={{ width: width as number, height: height as number }}>
			<UserPictureArea
				style={{
					width: relativeScreenDensity(pictureDimensions),
					height: relativeScreenDensity(pictureDimensions)
				}}
			>
				<UserPictureAreaInner
					buttonPressed={buttonPressed}
					activeOpacity={1}
					onPressIn={pressingButton}
					onPressOut={notPressingButton}
					onPress={releaseButton}
				>
					<MiniaturePortrait
						source={{ uri: profilePictureUrl || defaultUserProfilePicture }}
						recyclingKey={profilePictureUrl || defaultUserProfilePicture}
						placeholder={UserShadow}
						placeholderContentFit={'contain'}
						cachePolicy={'memory-disk'}
					// transition={200}
					/>
				</UserPictureAreaInner>
			</UserPictureArea>
			<UserInfo>
				<HorizontalUserInfo>
					{
						showLeaderSeal && (
							<>
								<LeaderSealWhiteIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
								<HorizontalSpacing />
							</>
						)
					}
					<UsernameTimeContainer>
						<UserName userNameFontSize={userNameFontSize} numberOfLines={2}>
							{userName}
						</UserName>
						{
							postDate && (
								<PostDateTime style={{ fontSize: relativeScreenDensity(postDateFontSize) }}>
									{postDate}
								</PostDateTime >
							)
						}
					</UsernameTimeContainer>
				</HorizontalUserInfo>
			</UserInfo>
		</Container>
	)
}

export { SmallUserIdentification }
