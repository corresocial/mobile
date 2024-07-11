import styled from 'styled-components/native'

interface ContainerProps {
	width: number
	height: number
}

export const Container = styled.View<ContainerProps>`
    align-items: center;
    justify-content: center;
    width: ${({ width }) => width}px;
    height:  ${({ height }) => height}px;
`

export const TouchableContainer = styled.TouchableOpacity<ContainerProps>`
    align-items: center;
    justify-content: center;
    width: ${({ width }) => width}px;
    height:  ${({ height }) => height}px;
`
