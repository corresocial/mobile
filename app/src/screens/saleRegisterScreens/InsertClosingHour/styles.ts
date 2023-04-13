import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

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

export const TwoPoints = styled.Text`
    font-size: 40px;
    font-family: Arvo_700Bold;
`

export const ButtonContainer = styled.View`
    width: 100%;
`
export const SkipButtonContainer = styled.View`
    width: 100%;
	position: absolute;
	bottom: ${relativeScreenWidth(6)}px;
`
