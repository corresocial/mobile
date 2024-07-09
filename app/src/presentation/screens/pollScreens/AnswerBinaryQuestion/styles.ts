import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`

interface InstructionButtonContainerProps {
	withPaddingLeft?: boolean
}

export const InstructionButtonContainer = styled.View<InstructionButtonContainerProps>`
	padding-left: ${({ withPaddingLeft }) => (withPaddingLeft ? relativeScreenWidth(15.5) : '0')}px;
	flex-direction: row;
	align-items: center;
`

export const ButtonOptionsContainer = styled.View`
	gap: ${relativeScreenDensity(40)}px;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`
