import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.SafeAreaView`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const SubscriptionButtonContainer = styled.View`
	background-color: ${({ theme }) => theme.orange2};
	padding: ${RFValue(25)}px;
	align-items: center;
	justify-content: center;
`
