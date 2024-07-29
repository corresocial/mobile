import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const ButtonOptionsContainer = styled.View`
	width: 100%;
	flex-direction: row;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	gap: ${relativeScreenDensity(10)}px;
`
