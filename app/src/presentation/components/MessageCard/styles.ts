import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 0;
	padding: 0px ${relativeScreenWidth(3)}px;
`

export const MessageContainer = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.black4};
	border-width: ${RFValue(3)}px;
	min-height: ${relativeScreenHeight(2)}px;
	max-width: 90%;
	align-items: flex-start;

	border-right-width: ${relativeScreenWidth(2.3)}px;
	border-radius: ${RFValue(18)}px;
	border-bottom-right-radius: 0px;
`

export const MessageContainerInner = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.white3};
	min-height: ${relativeScreenHeight(2)}px;

	padding: ${RFValue(5)}px  ${RFValue(10)}px;
	border-radius: ${RFValue(15)}px;
	border-bottom-right-radius: 0px;
`

export const TextMessage = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(14)}px;
`

export const DateTimeArea = styled.View`
	flex-direction: row;
	padding-top: 10px;
	align-items: flex-end;
	justify-content: space-between;
`

export const RelativeDateTime = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(12)}px;
	align-self: flex-end;
`
