import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.black[4]};
	border-radius: ${relativeScreenDensity(17)}px;
`

interface ContainerInnerProps {
    hasSvgIcon?: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	flex: 1;
	width: 98%;
    height:${relativeScreenHeight(10)}px;
    background-color: ${({ theme }) => theme.colors.white[3]};
    border-radius: ${relativeScreenDensity(17)}px;
    border: ${relativeScreenDensity(3.2)}px solid ${({ theme }) => theme.colors.black[4]};
    padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(15)}px;
    justify-content: space-around;
	${({ hasSvgIcon }) => {
        if (hasSvgIcon) {
            return `
			flex-direction: row;
			align-items: center;
		`
        }
    }};
`

export const Title = styled.Text`
    font-family: Arvo_400Regular;
    font-size:  ${relativeScreenDensity(22)}px;
    color: ${({ theme }) => theme.colors.black[4]};
`

export const Description = styled.Text`
    width: 100%;
    font-family: Arvo_400Regular;
    font-size:  ${relativeScreenDensity(13)}px;
    color: ${({ theme }) => theme.colors.black[4]};
`
