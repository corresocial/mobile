import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	Container,
	MiniaturePortrait,
	UserInfo,
	UserName,
	UserPictureArea,
	PostDateTime,
	TouchableArea
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
				<MiniaturePortrait
					source={{
						uri: profilePictureUrl || 'https://www.softdownload.com.br/wp-content/uploads/2018/03/como_trocar_foto_perfil_facebook.jpg',
					}}
				/>
			</UserPictureArea>
			<UserInfo>
				<TouchableArea onPress={navigateToProfile && navigateToProfile}>
					<UserName
						style={{ fontSize: RFValue(userNameFontSize) }}
						numberOfLines={2}
					>
						{userName}
					</UserName>
				</TouchableArea>
				<PostDateTime style={{ fontSize: RFValue(postDateFontSize) }}>
					{postDate}
				</PostDateTime >
			</UserInfo>
		</Container>
	)
}

export { SmallUserIdentification }
