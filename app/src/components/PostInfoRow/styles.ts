import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenHeight, relativeScreenWidth } from '../../common/screenDimensions'

interface ContainerProps {
	withoutMarginTop: number
}

export const Container = styled.View<ContainerProps>`
	margin-top:  ${({ withoutMarginTop }) => (!withoutMarginTop ? relativeScreenHeight(2) : 0)}px;
	margin-bottom: ${relativeScreenHeight(1)}px;
	flex-direction: row;
	align-items: center;
	`

export const PostInfoText = styled.Text`
	flex: 1;
	margin-left: ${relativeScreenWidth(4)}px;
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
