import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	border-left-width: ${RFValue(2)}px;
	border-left-color: ${({ theme }) => theme.black4};
	padding-vertical: ${RFValue(3)}px;
	padding-left: ${RFValue(10)}px;
`

export const CustomText = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(14)}px;
`
