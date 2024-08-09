import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	colapsed: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: ${({ colapsed }) => (colapsed ? '46%' : '98%')};
	height: ${relativeScreenDensity(120)}px;
    background-color: ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(25)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

interface InnerContainerProps {
	buttonPressed: boolean
	colapsed: boolean
}

export const InnerContainer = styled.View<InnerContainerProps>`
	width: 100%;
    height: 100%;
	flex-direction: ${({ colapsed }) => (colapsed ? 'column' : 'row')};
	align-items: center;
	background-color: ${({ theme }) => theme.colors.blue[3]};
    border: ${relativeScreenDensity(2.2)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(25)}px;
    position: absolute;
	overflow: hidden;
	gap: ${({ colapsed }) => (colapsed ? relativeScreenWidth(1) : relativeScreenWidth(2))}px;
	transform: ${({ theme, buttonPressed }) => (buttonPressed ? `translateX(${theme.shadowSize.medium}px)` : 'translateX(0px)')};
	right: ${({ theme }) => theme.shadowSize.medium}px;
`

interface EventDataContainerProps {
	colapsed: boolean
}

export const EventDataContainer = styled.View<EventDataContainerProps>`
	flex: 1;
	height: 100%;
	width: ${({ colapsed }) => (colapsed ? '100%' : 'auto')};
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenWidth(2)}px;
	flex-direction: column;
	justify-content: center;
	align-items: ${({ colapsed }) => (colapsed ? 'center' : 'start')};
	gap: ${relativeScreenWidth(2)}px;
`

interface PriceLabelContainerProps {
	hasImage: boolean
}

export const PriceLabelContainer = styled.View<PriceLabelContainerProps>`
	position: absolute;
	z-index: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
	bottom: ${({ hasImage }) => (hasImage ? '10%' : '43%')};
	padding: ${relativeScreenDensity(2)}px ${relativeScreenDensity(5)}px;
	text-align: center;
	border-radius: ${relativeScreenDensity(20)}px;
`

export const PriceLabel = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes[0]}px;
	color: ${({ theme }) => theme.colors.black[4]};
`

interface ImageContainerProps {
	hasImage: boolean
	colapsed: boolean
}

export const ImageContainer = styled.View<ImageContainerProps>`
	height: ${({ hasImage, colapsed }) => (colapsed ? (hasImage ? '60%' : '15%') : '100%')};
	width: ${({ hasImage, colapsed }) => (colapsed ? '100%' : (hasImage ? '34%' : '28%'))};
	background-color: ${({ theme }) => theme.colors.blue[1]};
	justify-content: center;
	align-items: center;
`

export const PostImage = styled.Image`
	height: 100%;
	width: 100%;
`

interface PostDescriptionProps {
	colapsed: boolean
}

export const PostDescription = styled.Text<PostDescriptionProps>`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes[1]}px;
	`
interface PostDescriptionContainerProps {
	colapsed: boolean
}

export const PostDescriptionContainer = styled.View<PostDescriptionContainerProps>`
	justify-content: center;
	padding: ${({ colapsed }) => (colapsed ? 0 : relativeScreenDensity(2))}px ${relativeScreenDensity(5)}px;
	border-left-style: solid;
	border-left-width: ${({ colapsed }) => relativeScreenWidth(colapsed ? 0 : 0.5)}px;
	border-left-color: ${({ theme }) => theme.colors.black[4]};
`
