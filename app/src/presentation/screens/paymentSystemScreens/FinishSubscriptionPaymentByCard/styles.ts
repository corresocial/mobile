import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const BodyScrollable = styled.ScrollView`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const Body = styled.KeyboardAvoidingView`
	flex: 1;
	overflow: visible;
`

export const TitleArea = styled.View`
	flex-direction: row;
	margin-bottom: ${RFValue(20)}px;
	align-items:center;
`

export const Title = styled.Text`
	margin-left: ${RFValue(10)}px;
	font-family: Arvo_400Regular;
	font-size: ${RFValue(20)}px;
`

export const PaymentStatusArea = styled.View`
	flex-direction: row;
	margin: ${RFValue(20)}px 0px;
	align-items:center;
`

export const PaymentStatusText = styled.Text`
	margin-left: ${RFValue(20)}px;
	font-family: Arvo_400Regular;
	font-size: ${RFValue(14)}px;
`
