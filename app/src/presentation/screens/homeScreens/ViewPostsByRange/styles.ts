import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${relativeScreenDensity(12)}px;
	padding-bottom: 0px;
`

export const InputContainer = styled.View`
	background-color: white;
	padding: ${relativeScreenDensity(10)}px ${relativeScreenDensity(10)}px;
	padding-bottom: ${relativeScreenDensity(10)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const Body = styled.KeyboardAvoidingView`
	flex: 1;
`

export const ContainerPadding = styled.ScrollView`
	padding: 0px ${relativeScreenDensity(10)}px;
`
