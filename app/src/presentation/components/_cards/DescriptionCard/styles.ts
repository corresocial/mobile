import Autolink from 'react-native-autolink'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface DescriptionTextProps {
	fontSize?: number
}

export const HyperlinkContainer = styled(Autolink) <DescriptionTextProps>`
	font-size: ${({ fontSize }) => (fontSize ? RFValue(fontSize) : RFValue(14))}px;
	font-family: Arvo_400Regular;
	`

export const LongText = styled.Text<DescriptionTextProps>`
	font-size: ${({ fontSize }) => (fontSize ? RFValue(fontSize) : RFValue(14))}px;
	font-family: Arvo_400Regular;
	`

export const SeeMoreLabel = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
	color: ${({ theme }) => theme.orange4};
`
