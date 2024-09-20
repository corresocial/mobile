import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`

export const InputsContainer = styled.View`
    width: 100%;
    min-height: 52px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
`

// REFACTOR relative
export const TwoPoints = styled.Text`
    font-size: 40px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`

export const ButtonContainer = styled.View`
    width: 100%;
`
