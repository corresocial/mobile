import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface DateTimeContainerProps {
	editable: boolean
}

export const DateTimeContainer = styled.View<DateTimeContainerProps>`
	padding: ${({ editable }) => (!editable ? relativeScreenDensity(10) : 0)}px;
`

export const FrequencyAndDays = styled.View`
	width: 100%;
`
