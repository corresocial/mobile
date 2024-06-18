import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const ButtonOptionsContainer = styled.View`
	gap: ${relativeScreenDensity(40)}px;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`
