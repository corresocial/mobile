import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
`

export const Title = styled.Text`
	font-size: ${RFValue(18)}px;
	font-family: Arvo_700Bold;
`
