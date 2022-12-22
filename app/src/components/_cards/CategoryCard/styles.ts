import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenWidth } from '../../../common/screenDimensions'

export const Container = styled.TouchableHighlight`
	width: ${screenWidth * 0.25}px;
	height: ${screenWidth * 0.25}px;
	background-color: ${({ theme }) => theme.black4}
	border-radius: ${RFValue(15)}px;
	margin-left: ${RFValue(7)}px;
	margin-bottom: ${RFValue(15)}px;
	`

export const ContainerInner = styled.View`
	padding: ${RFValue(5)}px;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: ${({ theme }) => theme.white3}
	border-radius: ${RFValue(15)}px;
	margin-left: ${RFValue(-7)}px;
	border: ${RFValue(2.5)}px solid ${({ theme }) => theme.black4};
	overflow: hidden;
`

export const Title = styled.Text`
	text-align: center;
	font-family: Arvo_700Bold;
	font-size: ${RFValue(12)}px;
`
