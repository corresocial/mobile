import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { relativeScreenWidth } from '@common/screenDimensions'

interface ContainerProps {
	backgroundColor?: string
	justifyContent?: ViewStyle['justifyContent']
	withoutPaddingTop?: boolean
}

export const Container = styled.View<ContainerProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.white3};
	justify-content: ${({ justifyContent }) => justifyContent || 'space-around'};

    flex: 1;
    padding:  ${relativeScreenWidth(6)}px;
    padding-top:  ${({ withoutPaddingTop }) => (withoutPaddingTop ? 0 : relativeScreenWidth(5))}px;
    align-items: center;
    overflow: hidden;
`
