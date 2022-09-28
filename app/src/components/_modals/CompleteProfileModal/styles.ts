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
    height: 400px;
    width: 80%;
    background-color: ${({ theme }) => theme.white3}
    padding: 30px;
    justify-content: space-between;
    border-radius: 10px;
    border-color: ${({theme}) => theme.black3}
    border-width: 5px;
    border-right-width: 11px;
`

export const Title = styled.Text`
    font-family: Arvo_400Regular;
    font-size: 24px;
    color: ${({theme}) => theme.black3}
`
export const Description = styled.Text`
    font-family: Arvo_400Regular;
    font-size: 20px;
      color: ${({theme}) => theme.black3}
`

export const Question = styled.Text`
    font-family: Arvo_400Regular;
    font-size: 20px;
      color: ${({theme}) => theme.black3}
`