import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import {
	Container,
	MiniaturePortrait,
	UserInfo,
	UserName,
	UserPictureArea,
	PostDateTime
} from './styles'

interface SmallUserIdentificationProps {
	width?: string | number
	height?: string | number
	userName: string | undefined
	postDate: string
	profilePictureUrl?: string | any // TODO  Type
	pictureDimensions?: number
	userNameFontSize?: number
	postDateFontSize?: number
}

function SmallUserIdentification({
	width = '100%',
	height,
	userName = 'usuário do corre.',
	postDate,
	profilePictureUrl = 'https://www.softdownload.com.br/wp-content/uploads/2018/03/como_trocar_foto_perfil_facebook.jpg',
	pictureDimensions = 35,
	userNameFontSize = 12,
	postDateFontSize = 12
}: SmallUserIdentificationProps) {
	return (
		<Container
			style={{
				width,
				height
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
						uri: profilePictureUrl,
					}}
				/>
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
