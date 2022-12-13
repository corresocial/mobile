import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenWidth } from '../../common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-left-Width: ${RFValue(2.5)}px;
`

export const AddressArea = styled.View`
	padding: ${RFValue(10)}px;
	width: 85%;
`

export const HighlightedAddress = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${RFValue(12)}px;
`

export const Address = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${RFValue(12)}px;
`

export const IconArea = styled.View`
	width: 15%;
	align-items: center;
	justify-content: center;
`
