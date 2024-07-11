import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	width: ${relativeScreenWidth(94)}px; // CURRENT Gambiarra, porcentagem não funciona
	align-self: center;
`
