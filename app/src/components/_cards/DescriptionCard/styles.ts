import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../../common/screenDimensions'

export const LongText = styled.Text`
	padding-top: ${relativeScreenHeight(1)}px;
	font-size: ${RFValue(14)}px;
	font-family: Arvo_400Regular;
`
