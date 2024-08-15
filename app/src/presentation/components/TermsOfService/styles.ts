import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface ContainerProps {
	calledFromConfig?: () => void
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({ calledFromConfig, theme }) => (calledFromConfig ? theme.colors.orange[2] : theme.transparence.orange())};
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${relativeScreenDensity(25)}px;
    overflow: hidden;
`

export const LinkButtonsContainer = styled.View`
    width: 100%;
    height: ${relativeScreenDensity(150)}px;
    justify-content: space-around;
    margin-bottom: ${relativeScreenDensity(30)}px;
`
