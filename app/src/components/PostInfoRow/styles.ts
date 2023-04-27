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
	justify-content: flex-start;
	align-items: center;
`

interface PostInfoTextProps {
	hasSeccondSvgIcon: boolean
}

export const PostInfoText = styled.Text<PostInfoTextProps>`
	${({ hasSeccondSvgIcon }) => (!hasSeccondSvgIcon ? 'flex: 1' : 'margin-right: 4%')};
	margin-left: ${relativeScreenWidth(4)}px;
	font-size: ${RFValue(12)}px;
	font-family: Arvo_400Regular;
`
