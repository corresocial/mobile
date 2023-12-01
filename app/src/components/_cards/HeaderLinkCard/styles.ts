import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

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
	font-size: ${RFValue(12)}px;
`
