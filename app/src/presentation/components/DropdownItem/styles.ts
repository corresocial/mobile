import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.TouchableOpacity`
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-left-Width: ${relativeScreenDensity(2.5)}px;
`

export const AddressArea = styled.View`
	padding: ${relativeScreenDensity(10)}px;
	width: 85%;
`

export const HighlightedAddress = styled.Text`
	font-family: Arvo_700Bold;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
`

export const Address = styled.Text`
	font-family: Arvo_400Regular;
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
`

export const IconArea = styled.View`
	width: 15%;
	align-items: center;
	justify-content: center;
`
