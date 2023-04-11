import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../common/screenDimensions'

export const TagsSelectedArea = styled.View`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: ${relativeScreenHeight(3)}px;
	overflow: visible;
`

export const Sigh = styled.View`
	width: ${RFValue(20)}px;
`
