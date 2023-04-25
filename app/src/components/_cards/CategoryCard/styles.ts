import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface ContainerInnerProps {
	inactiveColor: string
	hasElements: boolean
}

export const Container = styled.TouchableHighlight`
	width: ${relativeScreenWidth(25)}px;
	height: ${relativeScreenWidth(25)}px;
	background-color: ${({ theme }) => theme.black4}
	border-radius: ${RFValue(15)}px;
	margin-left: ${RFValue(7)}px;
	margin-bottom: ${RFValue(15)}px;
	`

export const ContainerInner = styled.View<ContainerInnerProps>`
	padding: ${RFValue(5)}px;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: ${(props) => (props.hasElements ? props.theme.white3 : props.inactiveColor)}
	border-radius: ${RFValue(15)}px;
	margin-left: ${RFValue(-7)}px;
	border: ${RFValue(2.5)}px solid ${({ theme }) => theme.black4};
	overflow: hidden;
`

export const Title = styled.Text`
	text-align: center;
	font-family: Arvo_700Bold;
	font-size: ${RFValue(12)}px;
`
