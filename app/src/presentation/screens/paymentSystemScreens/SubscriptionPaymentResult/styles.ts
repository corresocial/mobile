import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const Body = styled.View`
	flex: 1;
	padding: ${RFValue(17)}px;
	justify-content: space-around;
	overflow: visible;
`
