import styled from 'styled-components/native'
import { ViewStyle } from 'react-native'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface ContainerProps {
	backgroundColor?: string
	justifyContent?: ViewStyle['justifyContent']
}

export const Container = styled.View<ContainerProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.white3};
	justify-content: ${({ justifyContent }) => justifyContent || 'space-around'};

    flex: 1;
    padding:  ${relativeScreenWidth(6)}px;
    align-items: center;
    overflow: hidden;
`
