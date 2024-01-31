import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

export const Container = styled.View`
	flex: 1;
`

export const Header = styled.View`
	justify-content: space-between;
	width: 100%;
	background-color: ${({ theme }) => theme.white3};
	padding: ${RFValue(12)}px;
	padding-bottom: 0px;
`

export const InputContainer = styled.View`
	margin: ${relativeScreenWidth(5)}px 0px;
	height: ${RFValue(50)}px;
	padding:  ${relativeScreenWidth(2)}px ${relativeScreenWidth(2)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`

export const TagsContainer = styled.View`
	padding: ${RFValue(15)}px 0px;
	align-items: center;
	justify-content: center;
`

export const HorizontalPadding = styled.View`
	width: 100%;
	padding: 0px ${RFValue(15)}px;
`
