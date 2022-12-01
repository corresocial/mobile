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
	pictureDimensions?: number
	userNameFontSize?: number
	postDateFontSize?: number
}

function SmallUserIdentification({
	width = '100%',
	height,
	userName = 'usuário do corre.',
	postDate,
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
						uri: 'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2Fservices%2F3Hiwe1CX0VQtiHmQ5laH.jpg?alt=media&token=10d039b5-6109-4f6c-89c2-2060b22d505d',
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
