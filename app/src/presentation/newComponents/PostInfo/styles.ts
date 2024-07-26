import Autolink from 'react-native-autolink'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

// Common

export const Container = styled.View`
	width: 100%;
	gap: ${relativeScreenDensity(2)}px;
	background-color: white;
`

interface DescriptionTextProps {
	fontSize?: number
}

const CommonText = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes.arvo[3]}px;
	font-family: ${({ theme }) => theme.fonts.arvoBold};
`

interface TitleProps {
	titleLarge?: boolean
}

export const Title = styled(CommonText) <TitleProps>`
	color: ${({ theme }) => theme.colors.black[4]};
	${({ theme, titleLarge }) => titleLarge && `font-size: ${theme.fontSizes.arvo[4]}px};`}
`

export const ColumnContainer = styled.View`
	flex-direction: column;
`
interface ContentProps {
	enableIconSpace?: boolean
}

export const Content = styled.View<ContentProps>`
	width: ${({ enableIconSpace }) => (enableIconSpace ? '88%' : '100%')};
	flex-direction: row;
	align-items: center;
	gap: ${relativeScreenDensity(5)}px;
`

export const Value = styled(CommonText)`
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
`

export const DateTimeLabel = styled.Text`
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
`

// Descrição

export const HyperlinkContainer = styled(Autolink) <DescriptionTextProps>`
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
`

export const LongText = styled(CommonText) <DescriptionTextProps>`
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
`

export const SeeMoreLabel = styled(CommonText)`
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
	color: ${({ theme }) => theme.colors.orange[3]};
`

// Links

export const LinksContainer = styled.View`
	padding: ${relativeScreenDensity(10)}px;
	padding-bottom: 0px;
	gap: ${relativeScreenDensity(5)}px;
`

export const LinkContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	gap: ${relativeScreenDensity(10)}px;
`

export const TextLink = styled(CommonText)`
	text-decoration: underline;
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
	color: ${({ theme }) => theme.colors.orange[3]};
	text-decoration-color: ${({ theme }) => theme.colors.orange[3]};
`
// Price Value

interface PriceLabelProps {
	bold?: boolean
}

export const PriceLabel = styled.Text<PriceLabelProps>`
	font-family: ${({ theme, bold }) => (bold ? theme.fonts.nunitoBold : theme.fonts.nunitoSemiBold)};
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
`

export const ListItem = styled.Text`
	padding-left: ${relativeScreenDensity(10)}px;
	font-family: ${({ theme }) => theme.fonts.nunitoSemiBold};
	font-size: ${({ theme }) => theme.fontSizes.nunito[3]}px;
`
