import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
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

export const Body = styled.View`
	flex: 1;
`

export const GroupInfo = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	gap: ${relativeScreenDensity(8)}px;
	border-radius: ${relativeScreenDensity(15)}px;
`

export const GroupContent = styled.View`
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenDensity(15)}px ${relativeScreenDensity(15)}px;
	padding-top: 0px;
	gap: ${relativeScreenDensity(8)}px;
	border-radius: ${relativeScreenDensity(15)}px;
`

export const ButtonContainer = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
`
