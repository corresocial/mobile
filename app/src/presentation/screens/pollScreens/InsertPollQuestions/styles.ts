import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const ButtonsContainer = styled.View`
    width: 100%;
`

export const QuestionList = styled.FlatList`
	width: 100%;
`
