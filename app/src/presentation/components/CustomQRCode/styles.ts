import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
	width: 100%;
	align-items: center;
`

interface ClipboardProps {
	valueHasCliped?: boolean
}

export const ClipboardArea = styled.View<ClipboardProps>`
	flex-direction: ${({ valueHasCliped }) => (valueHasCliped ? 'row' : 'column')};
	align-items: ${({ valueHasCliped }) => (valueHasCliped ? 'center' : 'flex-start')};
	width: 100%;
	border-radius: ${RFValue(10)}px;
	margin: ${RFValue(20)}px 0px;
	padding: ${RFValue(15)}px;
	border-style: dashed;
	border-width: ${RFValue(2.5)}px;
	border-color: ${({ theme }) => theme.black4};
	justify-content: center;
`

export const CliboardText = styled.Text<ClipboardProps>`
	font-family: ${({ valueHasCliped }) => (valueHasCliped ? 'Arvo_700Bold' : 'Arvo_400Regular')};
	font-size: ${({ theme }) => theme.fontSizes[5]}px;
`
