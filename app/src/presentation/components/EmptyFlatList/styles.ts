import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: ${RFValue(20)}px;
`

export const Message = styled.Text`
	font-family: Arvo_700Bold;
	text-align: center;
`
