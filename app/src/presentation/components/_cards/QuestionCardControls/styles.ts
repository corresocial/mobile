import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.purple1};
	border-radius: ${RFValue(17.5)}px;
	overflow: hidden;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(13)}px;
	flex-direction: row;
	gap: ${relativeScreenDensity(10)}px;
`

export const QuestionArea = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	gap: ${relativeScreenDensity(10)}px;
`

export const Text = styled.Text`
	flex: 1;
	text-align: center;
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	font-family: Arvo_700Bold;
`

export const RightOptions = styled.View`
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`

export const TouchableIcon = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
`
