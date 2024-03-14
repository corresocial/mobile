import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`

export const HeaderDescription = styled.Text`
	font-family: 'Arvo_400Regular';
	font-size: ${RFValue(12)}px;
`

export const MapContainer = styled.View`
    flex: 1;
    position: relative;
`

export const SearchInputContainer = styled.View`
	padding: ${relativeScreenHeight(1.5)}px ${relativeScreenWidth(5)}px;
	background-color: transparent;
	position: absolute;
	width: 100%;
	z-index: 2;
`

export const MyLocationButtonContainer = styled.View`
    padding: 0px ${relativeScreenWidth(7)}px;
    width: 100%;
    position: absolute;
    top: ${relativeScreenHeight(10)}px;
    z-index: 1;
`

export const ButtonContainerBottom = styled.View`
	padding: 0px ${relativeScreenWidth(7)}px;
    width: 100%;
    position: absolute;
    bottom: ${relativeScreenHeight(5)}px;
    z-index: 1;
`
