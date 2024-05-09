import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const CarouselItemContainer = styled.View`
    align-items: center;
    justify-content: center;
    height: ${relativeScreenHeight(45)}px;
    padding:  ${RFValue(30)}px;
`

export const Slogan = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: Arvo_400Regular;
`

export const EasterEgg = styled.TouchableOpacity`
	padding: 10px;
	position: absolute;
	left: 0px;
	top: 0px;
`
