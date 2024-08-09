import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface TakePictureButtonProps extends TouchableOpacityProps {
	buttonPressed: boolean
}

console.log(relativeScreenWidth(21))
console.log(relativeScreenDensity(68))

export const OutlinedContainer = styled.View<TakePictureButtonProps>`
	border-width: 3px;
	border-color: ${({ theme }) => theme.colors.white[3]};
	border-radius: 200px;
	width: ${({ buttonPressed }) => (buttonPressed ? relativeScreenDensity(70) : relativeScreenDensity(80))}px;
	left: ${({ buttonPressed }) => (buttonPressed ? relativeScreenDensity(5) : 0)}px;
	margin: 0px ${({ buttonPressed }) => (buttonPressed ? relativeScreenDensity(5) : 0)}px;
`

export const ShadowButton = styled.View<TakePictureButtonProps>`
	background-color: ${({ theme }) => theme.colors.black[4]};
	width: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(19) : relativeScreenWidth(21))}px;
	height: ${relativeScreenWidth(19)}px;
	border-radius: 70px;
`

export const TakePictureButtonBottom = styled.View<TakePictureButtonProps>`
    background-color: ${({ theme }) => theme.colors.orange[1]};
	width: ${relativeScreenWidth(19)}px;
    height: ${relativeScreenWidth(19)}px;
    border-radius: 70px;
    align-items: center;
    justify-content: center;
	border-width: ${relativeScreenDensity(4)}px;
    padding: 1.5%;
	position: absolute;
`

export const TakePictureButtonSurface = styled.TouchableOpacity<TakePictureButtonProps | any>`
	border-color:${({ theme }) => theme.colors.orange[2]};
    background-color: ${({ theme }) => theme.colors.orange[3]};
    width: 70%;
    height: 70%;
    border-radius: 70px;
    border-width: ${relativeScreenWidth(2.5)}px;
    align-items: center;
    justify-content: center;
`
