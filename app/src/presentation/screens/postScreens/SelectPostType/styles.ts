import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const Container = styled.SafeAreaView<SafeAreaViewProps>`
    flex: 1;
	background-color: ${({ theme }) => theme.colors.white[3]};
`

export const SubscriptionButtonContainer = styled.View`
	background-color: ${({ theme }) => theme.colors.orange[2]};
	padding: ${relativeScreenDensity(25)}px;
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
