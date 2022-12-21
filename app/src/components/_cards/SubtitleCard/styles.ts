import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const RecentPostsHeader = styled.TouchableOpacity`
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
	justify-content: space-between;
	padding: ${RFValue(10)}px;
	border-left-width: ${RFValue(5)}px;
	border-color: ${({ theme }) => theme.black4};
`

export const Title = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${17}px;
`
