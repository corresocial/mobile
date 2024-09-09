import styled from 'styled-components/native'

export const Body = styled.View`
	width: 100%;
`

interface DescriptionProps {
	fullWidth?: boolean
}

export const Description = styled.Text<DescriptionProps>`
	${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes[4]}px;
	text-align: center;
`
