import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
 	flex: 1;
 `

export const Header = styled.View`
	background-color: ${({ theme }) => theme.white3}
	width: 100%;
 	padding: ${RFValue(10)}px;
 `

export const Body = styled.ScrollView`
	background-color: ${({ theme }) => theme.orange2}
 	flex: 1;
	padding: ${RFValue(20)}px;
 `

export const Sigh = styled.View`
	height: ${RFValue(10)}px;
 `

export const LastSigh = styled.View`
	width: 100%;
	height: ${RFValue(30)}px;
`
