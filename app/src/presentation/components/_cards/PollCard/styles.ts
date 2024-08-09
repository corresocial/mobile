import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 98%;
	height: ${relativeScreenHeight(24)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${RFValue(23)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

export const ContainerInner = styled.View`
	width: 100%;
    height: 100%;
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
    border: ${RFValue(3)}px solid ${({ theme }) => theme.black4};
    border-radius: ${RFValue(23)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;

	padding: ${RFValue(15)}px ${RFValue(15)}px;
`

export const Content = styled.View`
	flex: 1;
	justify-content: space-around;
`

export const TitleContainer = styled.View`
	padding: 0px ${RFValue(6)}px;
	overflow: hidden;
`

export const Title = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[5]}px;
`
