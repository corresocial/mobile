import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	hasIcon?: boolean
	backgroundColor?: string
	fontSize?: number
}

// ghost margin-bottom
export const Container = styled.View<ContainerProps>`
	margin-bottom: -1px;
	flex-direction: row;
	background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.white[3]};
	align-items: center;
	justify-content: ${({ hasIcon }) => (hasIcon ? 'flex-start' : 'space-between')};
	padding: ${relativeScreenDensity(10)}px;
	border-left-width: ${relativeScreenDensity(5)}px;
	border-color: ${({ theme }) => theme.colors.black[4]};
`

export const Title = styled.Text<ContainerProps>`
	flex: 1;
	width: ${({ hasIcon }) => (hasIcon ? '75%' : '60%')};
	${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme, fontSize }) => fontSize || theme.fontSizes[4]}px;
`

export const RightArea = styled.View`
	flex: 1;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`
