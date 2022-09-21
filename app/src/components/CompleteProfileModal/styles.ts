import styled from 'styled-components/native'

export const Container = styled.View`
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    align-items: center;
    justify-content: center;
`

export const TouchCloseArea = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Content = styled.View`
    height: 60%;
    width: 80%;
    height: 60%;
    background-color: ${({ theme }) => theme.white3}
`