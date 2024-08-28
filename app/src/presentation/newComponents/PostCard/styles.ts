import { Video } from 'expo-av'
import styled from 'styled-components/native'

import { relativeScreenDensity, relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	hasMedia?: boolean
}

export const Container = styled.TouchableOpacity<ContainerProps>`
	width: 98%;
	height: ${({ hasMedia }) => (hasMedia ? relativeScreenHeight(50) : relativeScreenHeight(24))}px;
    background-color: ${({ theme }) => theme.black4};
    border-radius: ${relativeScreenDensity(25)}px;
    position: relative;
	margin-left: ${relativeScreenWidth(1.9)}px;
`

interface InnerContainerProps {
	buttonPressed: boolean
	backgroundColor: string
}

export const InnerContainer = styled.View<InnerContainerProps>`
	width: 100%;
    height: 100%;
	flex-direction: column;
	align-items: center;
	background-color: ${({ backgroundColor }) => backgroundColor};
	margin-left: ${({ buttonPressed }) => (buttonPressed ? relativeScreenWidth(1.5) : 0)}px;
    border: ${relativeScreenDensity(2.5)}px solid ${({ theme }) => theme.colors.black[4]};
    border-radius: ${relativeScreenDensity(25)}px;
    position: absolute;
	overflow: hidden;
	left: ${-relativeScreenWidth(1.5)}px;
	gap: ${relativeScreenWidth(2)}px;
`

interface MediaContainerProps {
	hasMedia?: boolean
}

export const MediaContainer = styled.View<MediaContainerProps>`
	flex: ${({ hasMedia }) => (hasMedia ? 1 : 0)};
	width: 100%;
`

export const VideoView = styled(Video)`
	flex: 1;
`

export const PictureView = styled.Image`
	flex: 1;
`

export const DataContainer = styled.View`
	height: ${relativeScreenHeight(22.3)}px;
	width: 100%;
	padding: ${relativeScreenDensity(7)}px ${relativeScreenDensity(15)}px;
	background-color: ${({ theme }) => theme.colors.white[2]};
	align-items: center;
	justify-content: space-between;
`

export const PostDescriptionText = styled.Text`
	color: ${({ theme }) => theme.colors.black[4]};
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
	font-size: ${({ theme }) => relativeScreenDensity(theme.fontSizes.nunito[2])}px;
	width: 100%;
	text-align: left;
`

export const UserDataContainer = styled.View`
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white[4]};
	border-radius: ${relativeScreenDensity(15)}px;
	padding: ${relativeScreenDensity(6)}px;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
`

export const PostStatusContainer = styled.View`
	height: ${relativeScreenHeight(4)}px;
	align-items: center;
	justify-content: center;
`

export const InfoDataContainer = styled.View`
	flex-direction: column;
	width: 100%;
	gap: ${relativeScreenWidth(2)}px;

`

export const InfoGroup = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	gap: ${relativeScreenWidth(2)}px;
`

export const InfoContainer = styled.View`
	flex-direction: row;
	background-color: ${({ theme }) => theme.colors.white[4]};
	height: ${relativeScreenHeight(4)}px;
	border-radius: ${relativeScreenDensity(10)}px;
	padding: ${relativeScreenDensity(6)}px;
	align-items: center;
	justify-content: center;
	gap: ${relativeScreenWidth(2)}px;
	flex: 1;
`

export const InfoTitle = styled.Text`
	color: ${({ theme }) => theme.colors.black[4]};
	font-family: ${({ theme }) => theme.fonts.nunitoBold};
	font-size: ${({ theme }) => relativeScreenDensity(theme.fontSizes.nunito[2])}px;
`

interface PriceLabelProps {
	bold?: boolean
}

export const PriceLabel = styled.Text<PriceLabelProps>`
	font-family: ${({ theme, bold }) => (bold ? theme.fonts.nunitoBold : theme.fonts.nunitoSemiBold)};
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
`

export const MuteButtonContainer = styled.View`
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 2;
`

export const PlayButtonContainer = styled.View`
	flex: 1;
	position: absolute;
	justify-content: center;
	align-items: center;
	top: 0;
    left: 0;
    right: 0;
    bottom: 0;
	z-index: 2;
`

export const PlaceHolderThumbnailContainer = styled.View`
	flex: 1;
	position: absolute;
	z-index: 5;
	top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`
