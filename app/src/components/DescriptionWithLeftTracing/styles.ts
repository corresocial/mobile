import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	border-left-width: ${RFValue(2)}px;
	padding-horizontal:  ${RFValue(15)}px;
	justify-content: center;
`

export const Description = styled.Text`
	font-family: Arvo_400Regular;
	line-height: ${RFValue(20)}px;
	font-size: ${RFValue(16)}px;
`
