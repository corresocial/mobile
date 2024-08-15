import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`

`

export const HorizontalPostTypes = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	margin: ${relativeScreenDensity(15)}px 0px;
`
