import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps{
	colapsed: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: ${({ colapsed }) => (colapsed ? `${relativeScreenHeight(18)}px` : '98%')};
	height: ${relativeScreenHeight(18)}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(30)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

interface InnerContainerProps{
	buttonPressed: boolean
	colapsed: boolean
}

export const InnerContainer = styled.View<InnerContainerProps>`
	width: 100%;
    height: 100%;
	flex-direction: ${({ colapsed }) => (colapsed ? 'column' : 'row')};
	align-items: center;
	background-color: ${({ theme }) => theme.colors.blue[3]};
	margin-left: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(1.7) : 0)}px;
    border: ${relativeScreenDensity(3)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(30)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(2)}px;
	gap: ${({ colapsed }) => (colapsed ? relativeScreenWidth(1) : relativeScreenWidth(2))}px;
`

interface EventDataContainerProps{
	colapsed: boolean
}

export const EventDataContainer = styled.View<EventDataContainerProps>`
	height: 100%;
	width: 72%;
	background-color: ${({ theme }) => theme.colors.white[3]};
	padding: ${relativeScreenWidth(2)}px;
	flex-direction: column;
	justify-content: ${({ colapsed }) => (colapsed ? 'start' : 'center')};
	align-items: start;
	gap: ${relativeScreenWidth(2)}px;
`

interface PriceLabelProps{
	hasImage: boolean
}

export const PriceLabel = styled.Text<PriceLabelProps>`
	position: absolute;
	z-index: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
	width: 80%;
	bottom: ${({ hasImage }) => (hasImage ? '10%' : '43%')};
	padding: ${relativeScreenDensity(2)}px;
	text-align: center;
	border-radius: ${relativeScreenDensity(20)}px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes.arvo[2]}px;
	color: ${({ theme }) => theme.colors.black[4]};
`

interface ImageContainerProps{
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

interface PostDescriptionProps{
	colapsed: boolean
}

export const PostDescription = styled.Text<PostDescriptionProps>`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme, colapsed }) => theme.fontSizes.arvo[colapsed ? 2 : 3]}px;
`

interface PostDescriptionContainerProps{
	colapsed: boolean
}

export const PostDescriptionContainer = styled.View<PostDescriptionContainerProps>`
	justify-content: center;
	padding: ${({ colapsed }) => (colapsed ? 0 : relativeScreenWidth(2))}px ${relativeScreenWidth(2)}px;
	border-left-style: solid;
	border-left-width: ${({ colapsed }) => relativeScreenWidth(colapsed ? 0 : 0.5)}px;
	border-left-color: ${({ theme }) => theme.black4};
`

export const OwnerDataContainer = styled.View`
	align-items: center;
	flex-direction: row;
	gap: ${relativeScreenWidth(2)}px;
`

export const OwnerProfilePicture = styled.Image`
	width: ${relativeScreenWidth(11)}px;
	height: ${relativeScreenWidth(11)}px;
	border-width: ${relativeScreenDensity(2)}px;
	border-color: ${({ theme }) => theme.black4};
	border-radius: ${relativeScreenDensity(12)}px;
`

export const OwnerTextGroup = styled.View`
	align-items: column;
	justify-content: center;
`

export const OwnerName = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoBold};
	font-size: ${({ theme }) => theme.fontSizes.arvo[2]}px;
`

export const PostDate = styled.Text`
	font-family: ${({ theme }) => theme.fonts.arvoRegular};
	font-size: ${({ theme }) => theme.fontSizes.arvo[1]}px;
`
