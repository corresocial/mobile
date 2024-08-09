import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Body = styled.View`
	width: 100%;
`

interface DescriptionProps {
	fullWidth?: boolean
}

export const Description = styled.Text<DescriptionProps>`
	font-family: Arvo_400Regular;
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	text-align: center;
`
