import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const PathBar = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(22)}px;
	margin-right: ${RFValue(10)}px;
`

export const Title = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(16)}px;
	padding-horizontal: ${RFValue(10)}px;
	width: 85%;
`

export const PathTitle = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(16)}px;
	padding-horizontal: ${RFValue(10)}px;
	max-width: 50%;
`
