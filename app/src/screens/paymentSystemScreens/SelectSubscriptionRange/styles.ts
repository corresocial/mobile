import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`
export const ScrollContainer = styled.ScrollView`
	flex: 1;
`

export const CardArea = styled.View`
	width: 100%;
	padding: ${relativeScreenWidth(6)}px;
	background-color: ${({ theme }) => theme.orange2};
`
