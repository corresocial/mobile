import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`

`

export const HorizontalPostTypes = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	margin-vertical: ${RFValue(15)}px;
`
