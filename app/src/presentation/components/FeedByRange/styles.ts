import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
	backgroundColor?: string
}

export const Container = styled.ScrollView<ContainerProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.orange2};
`

export const PostCardContainer = styled.View`
	padding: 0px ${RFValue(10)}px;
`
