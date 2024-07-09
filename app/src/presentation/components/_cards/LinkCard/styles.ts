import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const LinksContainer = styled.View`
	padding: ${relativeScreenDensity(10)}px;
	padding-bottom: 0px;
`

export const LinkContainer = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.white2};
	margin-bottom: ${relativeScreenDensity(7)}px;
	border-radius: ${relativeScreenDensity(100)}px;
	padding: ${relativeScreenDensity(10)}px  ${relativeScreenDensity(20)}px;
	align-items: center;
	justify-content: center;
`

export const TextLink = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${relativeScreenDensity(14)}px;
	color: ${({ theme }) => theme.orange3};
`
