import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	align-items: center;
	flex-direction: row;
`

export const UserPictureArea = styled.View`
	width: ${RFValue(35)}px;
	height: ${RFValue(35)}px;
	border: ${RFValue(2)}px solid ${({ theme }) => theme.black4};
	border-radius: 5px;
`

export const MiniaturePortrait = styled.Image`
	width: 100%;
	height: 100%;
`

export const UserInfo = styled.View`
	padding: ${RFValue(8)}px;
`

export const UserName = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_700Bold;
`

export const PostDateTime = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
