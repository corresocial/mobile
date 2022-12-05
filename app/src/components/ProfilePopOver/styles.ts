import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { screenWidth } from '../../common/screenDimensions'

export const Container = styled.View`
	width: ${screenWidth * 0.8}px;
	padding: ${RFValue(20)}px;
	justify-content: space-between;
	position: relative;
`

export const CloseIcon = styled.TouchableOpacity`
	position: absolute;
	top: ${RFValue(5)};
	right: ${RFValue(5)};
`

export const UserName = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(14)}px;
	margin-top: ${RFValue(10)}px;
	margin-bottom: ${RFValue(15)}px;
`
