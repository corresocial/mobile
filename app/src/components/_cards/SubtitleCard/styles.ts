import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

// ghost margin-bottom
export const Container = styled.TouchableOpacity`
	margin-bottom: -1px;
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenWidth(2.7)}px;
	border-left-width: ${relativeScreenWidth(1.4)}px;
	border-color: ${({ theme }) => theme.black4};
`

export const Title = styled.Text`
	width: 90%;
	font-family: Arvo_400Regular;
	font-size: ${RFValue(16)}px;
`
