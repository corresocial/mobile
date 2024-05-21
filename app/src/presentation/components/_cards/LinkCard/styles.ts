import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const LinksContainer = styled.View`
	padding: ${RFValue(10)}px;
	padding-bottom: 0px;
`

export const LinkContainer = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.white2};
	margin-bottom: ${RFValue(7)}px;
	border-radius: ${RFValue(100)}px;
	padding: ${RFValue(10)}px ${RFValue(20)}px;
	align-items: center;
	justify-content: center;
`

export const TextLink = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.orange3};
`
