import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    width: 100%;
    padding: 0 ${(relativeScreenDensity(10))}px;
`

export const DividerView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${(relativeScreenDensity(6))}px ${(relativeScreenDensity(20))}px;
    border-radius: ${(relativeScreenDensity(16))}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white[3]};

`

export const TextArea = styled.View`
    flex-direction: column;
    width: 50%;
`

export const ButtonArea = styled.View`
    width: 50%;
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
