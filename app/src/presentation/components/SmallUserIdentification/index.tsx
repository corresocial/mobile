import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import {
	Container,
	MiniaturePortrait,
	UserInfo,
	UserName,
	UserPictureArea,
	PostDateTime,
	UserPictureAreaInner
} from './styles'
import UserShadow from '@assets/imgs/userShadow.jpg'

interface SmallUserIdentificationProps {
	width?: string | number
	height?: string | number
	userName: string | undefined
	postDate?: string
	profilePictureUrl?: string | null
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
		<Container style={{ width, height }}>
			<UserPictureArea
				style={{
					width: RFValue(pictureDimensions),
					height: RFValue(pictureDimensions)
				}}
			>
				<UserPictureAreaInner
					style={{ left: buttonPressed ? 0 : RFValue(-4) }}
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
						transition={300}
					/>
				</UserPictureAreaInner>
			</UserPictureArea>
			<UserInfo>
				<UserName
					style={{ fontSize: RFValue(userNameFontSize) }}
					numberOfLines={2}
				>
					{userName}
				</UserName>
				{
					postDate && (
						<PostDateTime style={{ fontSize: RFValue(postDateFontSize) }}>
							{postDate}
						</PostDateTime >
					)
				}
			</UserInfo>
		</Container>
	)
}

export { SmallUserIdentification }
