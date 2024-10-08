import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface TextProps {
	textColor?: string
}

interface TitleProps extends TextProps {
	checked?: boolean
	fontSize?: number
}

export const Container = styled.View`
	width: 100%;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(23)}px;
    justify-content: space-around;
	position: relative;
`

interface ContainerSurfaceProps {
	buttonPressed: boolean
}

export const ContainerInner = styled.TouchableOpacity<ContainerSurfaceProps>`
   	width: 100%;
   	height: 100%;
    background-color: ${({ theme }) => theme.colors.white[3]};
    border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(23)}px;
    padding: ${relativeScreenDensity(10)}px  ${relativeScreenDensity(15)}px;
    justify-content: space-around;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
`

export const TitleArea = styled.View`
	flex-direction: row;
	justify-content: space-between;
`

export const Title = styled.Text<TitleProps>`
    width: ${({ checked }) => (checked ? '70%' : '100%')};
    font-size:  ${({ fontSize }) => (fontSize ? relativeScreenDensity(fontSize) : relativeScreenDensity(22))}px;
    color:  ${({ textColor, theme }) => (textColor || theme.colors.black[4])};
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
`

export const Description = styled.Text<TextProps>`
    width: 100%;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    font-size:  ${relativeScreenDensity(14)}px;
	color:  ${({ textColor, theme }) => (textColor || theme.colors.black[4])};
`

export const Footer = styled.View`
    width: 100%;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
`

export const SmallThinFont = styled.Text`
	text-align: right;
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
    font-size:  ${relativeScreenDensity(18)}px;
    color: ${({ theme }) => theme.colors.black[4]};
`

export const SmallStrongFont = styled.Text`
	text-align: right;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
    font-size:  ${relativeScreenDensity(18)}px;
    color: ${({ theme }) => theme.colors.black[4]};
`

export const LargeStrongFont = styled.Text`
	text-align: right;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
    font-size:  ${relativeScreenDensity(25)}px;
    color: ${({ theme }) => theme.colors.black[4]};
`
