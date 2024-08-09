import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	hasIcon?: boolean
}

// ghost margin-bottom
export const Container = styled.View<ContainerProps>`
	margin-bottom: -1px;
	flex-direction: row;
	background-color: ${({ theme }) => theme.white3};
	align-items: center;
	justify-content: ${({ hasIcon }) => (hasIcon ? 'flex-start' : 'space-between')};
	padding: ${relativeScreenWidth(2.7)}px;
	border-left-width: ${relativeScreenWidth(1.4)}px;
	border-color: ${({ theme }) => theme.black4};
`

export const Title = styled.Text<ContainerProps>`
	width: ${({ hasIcon }) => (hasIcon ? '75%' : '60%')};
	font-family: Arvo_400Regular;
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
`

export const RightArea = styled.View`
	flex: 1;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`
