import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView<SafeAreaViewProps>`
    flex: 1;
	background-color: ${({ theme }) => theme.white3};
`

export const SubscriptionButtonContainer = styled.View`
	background-color: ${({ theme }) => theme.orange2};
	padding: ${RFValue(25)}px;
	align-items: center;
	justify-content: center;
`

interface SafeAreaViewProps {
	safeAreaColor?: string
	withoutFlex?: boolean
}

export const BottomSafeAreaColor = styled.SafeAreaView<SafeAreaViewProps>`
	flex: ${({ withoutFlex }) => (withoutFlex ? 0 : 1)};
	background-color: ${({ safeAreaColor, theme }) => safeAreaColor || theme.white3};
`
