import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const ButtonsContainer = styled.View`
    margin-top: ${relativeScreenDensity(60)}px;
    width: 100%;
`
