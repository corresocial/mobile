import { Image, ImageProps } from 'expo-image'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	align-items: center;
	flex-direction: row;
`

export const UserPictureArea = styled.View`
	border-radius: ${relativeScreenDensity(12)}px;
	margin-left: ${relativeScreenDensity(5)}px;
	position: relative;
	background-color: ${({ theme }) => theme.colors.black[4]};
	width: 100%;
`

interface ContainerSurfaceProps {
	buttonPressed: boolean
}

export const UserPictureAreaInner = styled.TouchableOpacity<ContainerSurfaceProps>`
	border: ${relativeScreenDensity(2)}px solid ${({ theme }) => theme.colors.black[4]};
	width: 100%;
	height: 100%;
	border-radius: ${relativeScreenDensity(12)}px;
	position: absolute;
	background-color: ${({ theme }) => theme.colors.white[3]};
	overflow: hidden;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.small}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.small}px;
`

export const MiniaturePortrait = styled(Image) <ImageProps>`
	width: 100%;
	height: 100%;
`

export const UserInfo = styled.View`
	padding: 0px ${relativeScreenDensity(8)}px;
	width: 85%;
`

export const HorizontalUserInfo = styled.View`
	flex-direction: row;
	align-items: center;
`

export const UsernameTimeContainer = styled.View`
`

interface UserNameProps {
	userNameFontSize: number
}

export const UserName = styled.Text<UserNameProps>`
	font-size: ${({ userNameFontSize }) => relativeScreenDensity(userNameFontSize)}px;
	font-family: Arvo_700Bold;
`

export const PostDateTime = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: Arvo_400Regular;
`
