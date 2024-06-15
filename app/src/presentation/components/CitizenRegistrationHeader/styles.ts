import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

interface InstructionButtonContainerProps {
	withPaddingLeft?: boolean
}

export const InstructionButtonContainer = styled.View<InstructionButtonContainerProps>`
	padding-left: ${({ withPaddingLeft }) => (withPaddingLeft ? relativeScreenWidth(15.5) : '0')}px;
	flex-direction: row;
	align-items: center;
`
