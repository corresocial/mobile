import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	border-left-width: ${RFValue(5)}px;
	padding: 0px ${RFValue(15)}px;
	justify-content: center;
`

export const Description = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`
