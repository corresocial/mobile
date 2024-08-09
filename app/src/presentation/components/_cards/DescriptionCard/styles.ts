import Autolink from 'react-native-autolink'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface DescriptionTextProps {
	fontSize?: number
}

export const HyperlinkContainer = styled(Autolink) <DescriptionTextProps>`
	font-size: ${({ fontSize }) => (fontSize ? relativeScreenDensity(fontSize) : relativeScreenDensity(14))}px;
	font-family: Arvo_400Regular;
	`

export const LongText = styled.Text<DescriptionTextProps>`
	font-size: ${({ fontSize }) => (fontSize ? relativeScreenDensity(fontSize) : relativeScreenDensity(14))}px;
	font-family: Arvo_400Regular;
	`

export const SeeMoreLabel = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.orange4};
`
