import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface SighProps {
	withoutSigh: boolean
}

export const Sigh = styled.View<SighProps>`
	margin-right: ${(props) => (props.withoutSigh ? RFValue(10) : 0)}px;
`
