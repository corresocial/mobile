import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(20)}px;
	padding-horizontal: ${RFValue(10)}px;
	width: 85%;
`
