import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenDensity } from '@common/screenDimensions'

export const InitialDropdownContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	width: 100%;
	height: ${relativeScreenHeight(10)}px;
	padding: 0px ${relativeScreenDensity(10)}px;
	border-radius: ${relativeScreenDensity(13)}px;
	overflow: hidden;
`

export const InitialDropdown = styled.TouchableOpacity`
	height: 100%;
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const IconArea = styled.View`
	align-items: center;
	justify-content: center;
	width: 10%;
	height: 100%;
`

export const AddressSelectedArea = styled.View`
	height: 100%;
	width: 73%;
	justify-content: center;
`

export const PresentationText = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	margin-bottom: ${relativeScreenDensity(3)}px;
`

export const AddressSelectedText = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`
