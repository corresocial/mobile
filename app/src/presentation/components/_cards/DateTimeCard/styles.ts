import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface DateTimeContainerProps {
	editable: boolean
}

export const DateTimeContainer = styled.View<DateTimeContainerProps>`
	padding: ${({ editable }) => (!editable ? RFValue(10) : 0)}px;
`

export const FrequencyAndDays = styled.View`
	width: 100%;
`
