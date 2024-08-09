import { Animated } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.orange[3]};
    align-items: center;
    justify-content: center;
    position: relative;
`

export const LogoContainer = styled(Animated.View)``
