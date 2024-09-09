import styled from 'styled-components/native'

export const Container = styled.View`
	align-items: center;
	width: auto;
`

export const CounterText = styled.Text`
	${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes[3]}px;
`
