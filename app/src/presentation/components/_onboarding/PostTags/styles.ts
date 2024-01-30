import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    position: relative;
`

export const ContainerBottom = styled.View`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const InputTagArea = styled.View`
    width: 100%;
    padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(4)}px;
`

export const TagsUnselectedArea = styled.View`
	padding: 0px ${relativeScreenWidth(3)}px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: ${relativeScreenHeight(5)}px;
    flex-wrap: wrap;
`

export const FloatButtonContainer = styled.View`
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 85%;
    height: 15%;
    position: absolute;
    bottom: ${relativeScreenHeight(1.4)}px;
`
