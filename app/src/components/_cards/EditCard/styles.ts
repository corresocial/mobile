import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { screenWidth } from '../../../common/screenDimensions'

export const CardHeader = styled.View`
	flex-direction: row;
	align-items: center;
`

export const ValueContainer = styled.View`
	padding-top: ${RFValue(8)}px;
	padding-bottom: ${RFValue(5)}px;
`

export const Text = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(14)}px;
`

export const PictureArea = styled.View`
	width: 100%;
	height: ${screenWidth * 0.88}px;
	border-width: ${RFValue(2)}px;
	border-radius: 10px;
	overflow: hidden;
	background-color: black;
`

export const ProfilePicture = styled.Image`
	overflow: hidden;
	flex: 1;
	resize-mode: cover;
	overflow: hidden;
`
