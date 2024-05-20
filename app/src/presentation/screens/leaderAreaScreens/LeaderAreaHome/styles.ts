import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.orange2};
`

export const HeaderButtonsContainer = styled.View`
	width: 100%;
  	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${relativeScreenDensity(3)}px;
`

export const HeaderSection = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: ${relativeScreenDensity(10)}px;
`
