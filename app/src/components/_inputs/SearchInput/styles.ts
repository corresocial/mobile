import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface ContainerProps {
	textIsValid?: boolean
	validBackgroundColor?: string
	focused: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 100%;
	min-height: ${RFValue(40)}px;
	padding-horizontal: ${RFValue(5)}px;
	background-color: ${({ theme, textIsValid, focused, validBackgroundColor }) => (
		textIsValid && validBackgroundColor
			? validBackgroundColor
			: focused ? theme.white3 : theme.white2
	)};
    height: ${relativeScreenWidth(14)}px;
    aling-items: center;
    justify-content: center;
	flex-direction: row;
	border-radius: ${relativeScreenWidth(100)}px;
	overflow: hidden;
`

export const SideArea = styled.TouchableOpacity`
	height: 100%;
	width: 15%;
	align-items: center;
    justify-content: center;
`

export const TextInput = styled.TextInput`
	flex: 1;
    font-size: ${RFValue(16)}px;
    font-family: Arvo_400Regular;
    text-align: center;
	color: ${({ theme }) => theme.black4};
`
