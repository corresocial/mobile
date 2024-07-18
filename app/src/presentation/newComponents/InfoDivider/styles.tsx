import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
    width: 100%;
`

export const DividerView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${(relativeScreenDensity(7))}px  ${(relativeScreenDensity(15))}px;
    border-radius: ${(relativeScreenDensity(15))}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white[3]};

`

export const TextArea = styled.View`
    flex-direction: column;
`

export const ButtonArea = styled.View`
	width: 40%;
    flex-direction: row-reverse;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.arvoBold};
    font-size: ${({ theme }) => theme.fontSizes.arvo[3]}px;
    color: ${({ theme }) => theme.colors.black[4]};
`

export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.arvoRegular};
    font-size: ${({ theme }) => theme.fontSizes.arvo[2]}px;
    color: ${({ theme }) => theme.colors.black[4]};
`
