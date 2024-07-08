import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	width: 100%;
	overflow: hidden;
	background-color: ${({ theme }) => theme.orange2};
`

export const DropdownContainer = styled.View`
	z-index: 2;
	background-color: ${({ theme }) => theme.orange2};
	padding: 0px ${relativeScreenDensity(10)}px;
`

export const ContainerPadding = styled.View`
	padding: 0px ${relativeScreenDensity(10)}px;
	align-items: flex-end;
`
