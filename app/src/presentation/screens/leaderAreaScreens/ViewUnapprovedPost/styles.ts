import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.pink2};
`

export const Body = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.pink2};
	padding: 0px ${relativeScreenWidth(3)}px;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenHeight(2)}px ${relativeScreenWidth(3)}px;
`

export const UserAndValueContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`

export const OptionsArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
