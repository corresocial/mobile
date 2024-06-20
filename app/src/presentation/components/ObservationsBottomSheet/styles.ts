import styled from 'styled-components/native'

import { relativeScreenDensity } from '@common/screenDimensions'

export const bottomSheetBackgroundStyle = {
	borderTopLeftRadius: relativeScreenDensity(25),
	borderTopRightRadius: relativeScreenDensity(25)
}

export const BottomSheetHeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${relativeScreenDensity(10)}px;
    background-color: ${({ theme }) => theme.white2};
	border-top-left-radius: ${relativeScreenDensity(25)}px;
	border-top-right-radius: ${relativeScreenDensity(25)}px;
`

export const HeaderTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${relativeScreenDensity(10)}px;
`

export const BottomSheetHeaderText = styled.Text`
    font-size: 18px;
    font-family: Arvo_700Bold;
`

export const CloseModalArea = styled.TouchableOpacity`
	height: ${relativeScreenDensity(30)}px;
	width: ${relativeScreenDensity(30)}px;
	align-items: center;
	justify-content: center;
`

export const InputsContainer = styled.View`
	justify-content: center;
	align-items: center;
	width: 100%;
`

export const BottomSheetViewContainer = styled.View`
	align-items: center;
	height: 100%;
	padding: 5%;
	gap: ${relativeScreenDensity(10)}px;
`

export const ObservationsFlatList = styled.FlatList`
	flex: 1;
	width: 100%;
`
