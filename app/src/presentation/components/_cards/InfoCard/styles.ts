import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

import { relativeScreenHeight } from '@common/screenDimensions'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.black4};
	border-radius: ${RFValue(17)}px;
`

interface ContainerInnerProps {
    hasSvgIcon?: boolean
}

export const ContainerInner = styled.View<ContainerInnerProps>`
	flex: 1;
	width: 98%;
    height:${relativeScreenHeight(10)}px;
    background-color: ${({ theme }) => theme.white3};
    border-radius: ${RFValue(17)}px;
    border: ${RFValue(3.2)}px solid ${({ theme }) => theme.black4};
    padding: ${RFValue(10)}px ${RFValue(15)}px;
    justify-content: space-around;
	${({ hasSvgIcon }) => {
		if (hasSvgIcon) {
			return `
			flex-direction: row;
			align-items: center;
		`
		}
	}}
`

export const Title = styled.Text`
    font-family: Arvo_400Regular;
    font-size:  ${RFValue(22)}px;
    color: ${({ theme }) => theme.black4}
`

export const Description = styled.Text`
    width: 100%;
    font-family: Arvo_400Regular;
    font-size:  ${RFValue(13)}px;
    color: ${({ theme }) => theme.black4}
`
