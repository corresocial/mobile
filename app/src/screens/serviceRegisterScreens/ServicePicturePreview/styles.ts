import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight } from '../../../common/screenDimensions'

export const Container = styled.View`
    flex: 1;
`

export const PicturePreviewContainer = styled.View`
    flex: 1;
    height: ${relativeScreenHeight(81)}px;
    padding-horizontal: ${RFValue(15)}px;
    justify-content: space-around;
    align-items: center;
`

export const TopArea = styled.View`
	padding-horizontal: ${RFValue(20)}px;
	padding-right: ${RFValue(25)}px;
	padding-vertical: ${RFValue(10)}px;
	flex-direction: row;
	align-items: center;
`
