import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

interface SafeAreaViewProps {
	safeAreaColor?: string
	withoutFlex?: boolean
}

export const SafeAreaViewContainer = styled.SafeAreaView<SafeAreaViewProps>`
	flex: ${({ withoutFlex }) => (withoutFlex ? 0 : 1)};
	background-color: ${({ safeAreaColor, theme }) => safeAreaColor || theme.white3};
`

interface ContainerProps {
	justifyContent: ViewStyle['justifyContent']
	alignItems: ViewStyle['alignItems']
	withPadding: boolean
}

export const Container = styled.View<ContainerProps>`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
    justify-content: ${({ justifyContent }) => justifyContent};
    align-items: ${({ alignItems }) => alignItems};
    padding: ${({ withPadding }) => (withPadding ? relativeScreenDensity(15) : 0)}px;
`
