import styled from 'styled-components/native'

import { platformIsIOS, relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.SafeAreaView<SafeAreaViewProps>`
    flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const CardsContainer = styled.View<SafeAreaViewProps>`
    flex: 1;
	background-color: ${({ theme }) => theme.colors.orange[2]};
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: ${relativeScreenDensity(10)}px;
`

export const CardsContent = styled.View<SafeAreaViewProps>`
	background-color: ${({ theme }) => theme.colors.orange[2]};
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
`

export const SubscriptionButtonContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.orange[2]};
	padding: ${relativeScreenDensity(15)}px;
	padding-bottom: ${platformIsIOS ? relativeScreenDensity(25) : relativeScreenDensity(15)}px;
	align-items: center;
	justify-content: center;
`

interface SafeAreaViewProps {
	safeAreaColor?: string
	withoutFlex?: boolean
}

export const BottomSafeAreaColor = styled.SafeAreaView<SafeAreaViewProps>`
	flex: ${({ withoutFlex }) => (withoutFlex ? 0 : 1)};
	background-color: ${({ safeAreaColor, theme }) => safeAreaColor || theme.colors.white[3]};
`
