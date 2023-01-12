import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../common/screenDimensions'

export const ScrollView = styled.ScrollView`
    width: 100%;
    flex-direction: row;
`

export const Container = styled.View`
    width: 100%;
	height: ${relativeScreenHeight(8)}px;
    flex-direction: row;
    align-items: center;
`

export const TouchableIcon = styled.TouchableOpacity`
	margin-right: ${17}px;
`
