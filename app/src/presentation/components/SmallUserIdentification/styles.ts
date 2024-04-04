import { Image, ImageProps } from 'expo-image'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	align-items: center;
	flex-direction: row;
`

export const UserPictureArea = styled.View`
	border-radius: ${RFValue(8)}px;
	margin-left: ${RFValue(5)}px;
	position: relative;
	background-color: ${({ theme }) => theme.black4};
	width: 100%;
`

export const UserPictureAreaInner = styled.TouchableOpacity`
	border: ${RFValue(2)}px solid ${({ theme }) => theme.black4};
	width: 100%;
	height: 100%;
	border-radius: ${RFValue(7)}px;
	position: absolute;
	background-color: ${({ theme }) => theme.white3};
	overflow: hidden;
	left: ${RFValue(-5)}px;
`

export const MiniaturePortrait = styled(Image) <ImageProps>`
	width: 100%;
	height: 100%;
	resize-mode: cover;
`

export const UserInfo = styled.View`
	padding: 0px ${RFValue(8)}px;
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
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
