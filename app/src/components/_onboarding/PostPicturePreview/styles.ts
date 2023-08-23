import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const PicturePreviewContainer = styled.View`
    flex: 1;
    padding-horizontal: ${RFValue(15)}px;
    justify-content: flex-end;
    align-items: center;
`

export const TopArea = styled.View`
	flex: 0.2;
	padding-horizontal: ${RFValue(20)}px;
	padding-right: ${RFValue(25)}px;
	padding-vertical: ${RFValue(10)}px;
	flex-direction: row;
	align-items: center;
`
