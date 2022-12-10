import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
	height: ${RFValue(60)}px;
    flex-direction: row;
    align-items: center;
`

export const TouchableIcon = styled.TouchableOpacity`
	margin-right: ${17}px;
`
