import styled from 'styled-components/native'
import {Animated} from 'react-native'

import { theme } from '../../commonStyles/theme/theme'
import { screenHeight } from '../../commonStyles/screenDimensions'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background.primary};
    align-items: center;
    justify-content: center;
    position: relative;
`

export const BuildingsContainer = styled(Animated.View)`
    position: absolute;
    bottom: 0;
    align-self: center;
`

export const LogoContainer = styled(Animated.View)``

export const BottomLine = styled.View`
    position: absolute;
    bottom: 0;
    height: ${screenHeight * 0.004}px;
    width: 100%;
    background-color: ${theme.background.secondary};
`
