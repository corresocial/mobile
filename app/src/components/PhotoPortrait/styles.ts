import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { relativeScreenWidth } from '../../common/screenDimensions'

interface ContainerProps {
	circle?: boolean
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({ theme }) => theme.black4};
    width: 100%;
    border: ${RFValue(5)}px solid ${({ theme }) => theme.black4};
    border-right-width:  ${RFValue(10)}px;
    border-radius: ${({ circle }) => (circle ? RFValue(500) : RFValue(10))}px;
    position: relative;
    max-width: ${relativeScreenWidth(90)}px;
    max-height: ${relativeScreenWidth(89)}px;
	overflow: hidden;
`

export const NoPhotoContainer = styled.View`
	flex: 1;
    background-color: ${({ theme }) => theme.white3};
	border-radius: ${RFValue(8)}px;
	overflow: hidden;
`

export const DeleteItemArea = styled.TouchableOpacity`
    position: absolute;
    align-items: center;
    justify-content: center;
    width: ${relativeScreenWidth(14)}px;
    height: ${relativeScreenWidth(14)}px;
    padding:  ${relativeScreenWidth(2.5)}px;
    bottom:  ${relativeScreenWidth(1.25)}px;;
    right:  ${relativeScreenWidth(1.25)}px;;
`

export const CheckArea = styled.View`
	position: absolute;
	width: ${relativeScreenWidth(9)}px;
    height: ${relativeScreenWidth(9)}px;
	bottom: ${relativeScreenWidth(-2)}px;
	right: ${relativeScreenWidth(-2)}px;
`
