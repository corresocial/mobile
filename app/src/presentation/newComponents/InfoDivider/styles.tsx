import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    width: 100%;
    padding: 0 ${(relativeScreenDensity(10))}px;
`

export const DividerView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${(relativeScreenDensity(6))}px ${(relativeScreenWidth(5))}px;
    border-radius: ${(relativeScreenDensity(16))}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white[3]};

`

export const TextArea = styled.View`
    flex-direction: column;
	background-color: blue;
`

export const ButtonArea = styled.View`
	background-color:red;
	width: 40%;
`

export const Title = styled.Text`
    font-family: Arvo_700Bold; // CURRENT Importar com theme
    font-size: ${(relativeScreenDensity(18))}px;
    color: ${({ theme }) => theme.colors.black[4]};
`

export const SubTitle = styled.Text`
    font-family: Arvo_400Regular;
    font-size: ${(relativeScreenDensity(12))}px;
    color: ${({ theme }) => theme.colors.black[4]};
`
