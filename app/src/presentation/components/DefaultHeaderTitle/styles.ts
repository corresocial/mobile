import styled from 'styled-components/native'

export const Container = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes[8]}px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`
