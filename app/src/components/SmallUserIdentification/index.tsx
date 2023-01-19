import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	Container,
	MiniaturePortrait,
	UserInfo,
	UserName,
	UserPictureArea,
	PostDateTime,
	UserPictureAreaInner
} from './styles'

interface SmallUserIdentificationProps {
	width?: string | number
	height?: string | number
	userName: string | undefined
	postDate: string
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
		<Container
			style={{
				width,
				height,
			}}
		>
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
						source={{
							uri: profilePictureUrl || 'https://www.softdownload.com.br/wp-content/uploads/2018/03/como_trocar_foto_perfil_facebook.jpg',
						}}
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
				<PostDateTime style={{ fontSize: RFValue(postDateFontSize) }}>
					{postDate}
				</PostDateTime >
			</UserInfo>
		</Container>
	)
}

export { SmallUserIdentification }
