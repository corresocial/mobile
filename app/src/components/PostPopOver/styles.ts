import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { screenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
	background-color: ${({ theme }) => theme.black4}
	width: ${screenWidth * 0.8}px;
	border-right-width: ${RFValue(10)}px;
	border-radius: ${RFValue(8)}px;
`

export const ContainerInner = styled.View`
	background-color: ${({ theme }) => theme.white3}
	width:100%;
	height: 100%;
	padding: ${RFValue(20)}px;
	justify-content: space-between;
	position: relative;
	border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};
	border-radius: ${RFValue(8)}px;
`

export const CloseIcon = styled.TouchableOpacity`
	position: absolute;
	top: ${RFValue(5)};
	right: ${RFValue(5)};
`

export const PostTitle = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(16)}px;
	width: 92%;
	margin-bottom: ${RFValue(15)}px;
`
