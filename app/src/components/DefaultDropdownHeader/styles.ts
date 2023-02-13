import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { screenHeight } from '../../common/screenDimensions'

export const InitialDropdownContainer = styled.View`
	background-color: ${({ theme }) => theme.white3};
	width: 100%;
	height: ${screenHeight * 0.1}px;
	padding-horizontal: ${RFValue(10)}px;
	border-radius: ${RFValue(13)}px;
	overflow: hidden;
`

export const InitialDropdown = styled.TouchableOpacity`
	height: 100%;
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const AddressSelectedArea = styled.View`
	height: 100%;
	width: 73%;
	justify-content: center;
`

export const PresentationText = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	margin-bottom: ${RFValue(3)}px;
`

export const AddressSelectedText = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_700Bold;
`
