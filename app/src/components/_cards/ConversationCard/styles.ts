import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenHeight(15)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(13)}px;
    position: relative;
	overflow: visible;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

export const ContainerInner = styled.View`
	width: 100%;
    height: 100%;

	background-color: ${({ theme }) => theme.white3};
    border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};

    border-radius: ${RFValue(13)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
`

export const UserInfo = styled.View`
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: ${relativeScreenHeight(1.3)}px;
`

export const LastMessageArea = styled.View`
	width: 100%;
	padding: ${relativeScreenHeight(2)}px;
`
