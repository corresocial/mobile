import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`

export const InstructionContainer = styled.View`
	flex-direction: row;
	align-items: center;
`

export const FormContent = styled.View`
	gap: ${relativeScreenDensity(40)}px;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`
