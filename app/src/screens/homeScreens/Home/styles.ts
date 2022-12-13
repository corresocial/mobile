import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
`

export const DropdownContainer = styled.View`
	margin-top: ${RFValue(5)}px;
	padding-horizontal: ${RFValue(10)}px;
`

export const HorizontalPostTypes = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	margin-vertical: ${RFValue(15)}px;
`

export const RecentPostsContainer = styled.View`

`

export const RecentPostsHeader = styled.TouchableOpacity`
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
	justify-content: space-between;
	padding: ${10}px;
	border-left-width: ${RFValue(5)}px;
	border-color: ${({ theme }) => theme.black4};
`

export const Title = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${17}px;
`

export const Sigh = styled.View`
	width: 100%;
	height: ${RFValue(10)}px;
`

export const FooterSigh = styled.View`
	width: 100%;
	height: ${RFValue(280)}px;
`
