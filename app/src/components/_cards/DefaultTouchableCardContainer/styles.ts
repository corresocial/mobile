import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
	flex?: number
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	background-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(17.5)}px;
	width: 98%;
	alignSelf: flex-end;
	position: relative;
`

interface ContainerInnerProps {
	pressionable?: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	background-color: ${({ theme }) => theme.white3};
	border-radius: ${RFValue(18)}px;
	border: ${RFValue(2.5)}px solid black;
	right: ${RFValue(5)}px;
	position: relative;
`
