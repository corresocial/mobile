import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	align-items: center;
	width: auto;
`

export const CounterText = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(13)}px;
`
