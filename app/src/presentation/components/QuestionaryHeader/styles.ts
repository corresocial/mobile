import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const HeaderContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: ${relativeScreenDensity(15)}px;
    padding-right: ${relativeScreenDensity(15)}px;
    height: ${relativeScreenDensity(55)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.orange1};
`

export const ButtonsContainer = styled.View`
	flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
	gap: ${relativeScreenDensity(5)}px;
`

export const ButtonArea = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${relativeScreenDensity(40)}px;
    width: ${relativeScreenDensity(40)}px;
`
