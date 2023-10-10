import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface LoaderProps {
	animationScale?: number
}

export const Container = styled.View`
    align-items: center;
    justify-content: center;
`

export const AnimationContainer = styled.View<LoaderProps>`
    width: ${({ animationScale }) => RFValue(animationScale || 60)}px;
    height: ${({ animationScale }) => RFValue(animationScale || 60)}px;
`
