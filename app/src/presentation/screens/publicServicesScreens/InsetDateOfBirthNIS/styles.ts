import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`

export const InputsContainer = styled.View`
    width: 100%;
    min-height: 52px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
`

export const ButtonContainer = styled.View`
    width: 100%;
`

interface InstructionButtonContainerProps {
	withPaddingLeft?: boolean
}

export const InstructionButtonContainer = styled.View<InstructionButtonContainerProps>`
	padding-left: ${({ withPaddingLeft }) => (withPaddingLeft ? relativeScreenWidth(15.5) : '0')}px;
	flex-direction: row;
	align-items: center;
`
