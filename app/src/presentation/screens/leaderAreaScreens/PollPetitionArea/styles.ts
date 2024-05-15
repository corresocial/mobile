import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.ScrollView`
	width: 100%;
	background-color: ${({ theme }) => theme.purple2};
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(12)}px;
`

export const HeaderButtonsContainer = styled.View`
	width: 100%;
  	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const HeaderSection = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: ${relativeScreenDensity(10)}px;
`
