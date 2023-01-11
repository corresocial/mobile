import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

export const RecentPostsHeader = styled.TouchableOpacity`
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenWidth(2.7)}px;
	border-left-width: ${relativeScreenWidth(1.3)}px;
	border-color: ${({ theme }) => theme.black4};
`

export const Title = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(17)}px;
`
