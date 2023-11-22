import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface TakePictureButtonProps {
	buttonPressed: boolean
}

export const OutlinedContainer = styled.View<TakePictureButtonProps>`
	border-width: 3px;
	border-color: ${({ theme }) => theme.white3};
	border-radius: 200px;
	width: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(21) : relativeScreenWidth(24))}px;
	left: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(1.5) : 0)}px;
	margin-horizontal: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(1.5) : 0)}px;
`

export const ShadowButton = styled.View<TakePictureButtonProps>`
	background-color: ${({ theme }) => theme.black4};
	width: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(19) : relativeScreenWidth(21))}px;
	height: ${relativeScreenWidth(19)}px;
	border-radius: 70px;
`

export const TakePictureButtonBottom = styled.View<TakePictureButtonProps>`
    background-color: ${({ theme }) => theme.orange1};
	width: ${relativeScreenWidth(19)}px;
    height: ${relativeScreenWidth(19)}px;
    border-radius: 70px;
    align-items: center;
    justify-content: center;
	border-width: ${RFValue(4)}px;
    padding: 1.5%;
	position: absolute;
`

export const TakePictureButtonSurface = styled.TouchableOpacity<TakePictureButtonProps>`
	border-color:${({ theme }) => theme.orange2};
    background-color: ${({ theme }) => theme.orange3};
    width: 70%;
    height: 70%;
    border-radius: 70px;
    border-width: ${relativeScreenWidth(2.5)}px;
    align-items: center;
    justify-content: center;
`
