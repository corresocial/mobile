import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;  
    background-color: ${({theme}) => theme.white3};
    border-left-width: 5px;
    border-left-color: ${({theme}) => theme.black4};
    padding: 20px;
`

export const Message = styled.Text`
    color: ${({theme}) => theme.black4};
    font-size: 20px;
    font-family: Arvo_400Regular;
    line-height: 22px;
    flex-wrap: wrap;
`

