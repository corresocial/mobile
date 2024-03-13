import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	border-left-width: ${RFValue(2.5)}px;
	padding: 0px ${RFValue(6)}px;
	overflow: hidden;
`

export const Text = styled.Text`
	font-family: Arvo_400Regular;
`
