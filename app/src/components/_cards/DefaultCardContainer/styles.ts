import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.black4};
	border: ${RFValue(2.5)}px solid black;
	border-right-width: ${RFValue(7.5)}px;
	border-radius: ${RFValue(15)}px;
	overflow: hidden;
`

export const ContainerInner = styled.View`
	background-color: ${({ theme }) => theme.white3};
	border-radius: ${RFValue(13)}px;
`
