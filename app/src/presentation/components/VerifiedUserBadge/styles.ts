import styled from 'styled-components/native'

export const BadgeLabel = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	${({ theme }) => theme.fonts.arvoRegular};
`
