import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { ListRenderItem, TextInput } from 'react-native'
import { useTheme } from 'styled-components'

import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import { CitizenRegisterQuestionObservation } from '@domain/citizenRegister/model/entities/types'

import { FlatListItem } from 'src/presentation/types'

import { BottomSheetHeaderContainer, BottomSheetHeaderText, BottomSheetViewContainer, CloseModalArea, HeaderTitleContainer, InputsContainer, ObservationsFlatList, bottomSheetBackgroundStyle } from './styles'
import DownArrowIcon from '@assets/icons/angleDown-white.svg'
import ObservationIcon from '@assets/icons/description-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

import { ObservationCard } from '@components/_cards/ObservationCard'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

// Tipagem de forwardRef
export interface ObservationsBottomSheetRef {
	show: () => void
}

interface ObservationsBottomSheetProps {
	observations: CitizenRegisterQuestionObservation[]
	addNewObservation(message: string): void
	deleteObservation(observation: CitizenRegisterQuestionObservation): void
}

const ObservationsBottomSheet = forwardRef(({
	observations,
	addNewObservation,
	deleteObservation
}: ObservationsBottomSheetProps, ref) => {
	const theme = useTheme()

	const [observationInputText, setObservationInputText] = useState('')

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const observationInputRef = useRef<TextInput>(null)

	useImperativeHandle(ref, () => ({
		show: () => bottomSheetModalRef.current?.present()
	}))

	const addObservation = () => {
		if (!observationInputText) return
		addNewObservation(observationInputText)
		setObservationInputText('')
	}

	const removeObservation = (observation: CitizenRegisterQuestionObservation) => {
		if (!observation.questionId) return
		deleteObservation(observation)
	}

	const snapBottomSheet = (index: number) => {
		setTimeout(() => bottomSheetModalRef.current?.snapToIndex(index), 100)
	}

	const closeBottomSheet = () => {
		bottomSheetModalRef.current?.close()
	}

	const getBackgropBottomSheet = (props: BottomSheetBackdropProps) => {
		return (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.7} // Define a opacidade do backdrop
				style={{
					flex: 1,
					backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor e opacidade do backdrop
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
		)
	}

	const renderCustomHeader = () => {
		return (
			<BottomSheetHeaderContainer>
				<HeaderTitleContainer>
					<ObservationIcon height={relativeScreenDensity(20)} />
					<BottomSheetHeaderText>{'observações'}</BottomSheetHeaderText>
				</HeaderTitleContainer>
				<CloseModalArea
					activeOpacity={1}
					onPress={closeBottomSheet}
				>
					<DownArrowIcon width={30} height={30} />
				</CloseModalArea>
			</BottomSheetHeaderContainer>
		)
	}

	const renderObservationCard = ({ item }: FlatListItem<CitizenRegisterQuestionObservation>) => {
		return (
			<ObservationCard
				observationData={item}
				deleteObservation={removeObservation}
			/>
		)
	}

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={0}
			snapPoints={[relativeScreenHeight(50), relativeScreenHeight(85)]}
			handleComponent={renderCustomHeader}
			backgroundStyle={bottomSheetBackgroundStyle}
			backdropComponent={getBackgropBottomSheet}
			enableContentPanningGesture={false}
		>
			<BottomSheetView>
				<BottomSheetViewContainer>
					<InputsContainer>
						<DefaultInput
							textInputRef={observationInputRef}
							value={observationInputText}
							defaultBackgroundColor={theme.white3}
							validBackgroundColor={theme.white3}
							lastInput
							fontSize={16}
							onTouchStart={() => snapBottomSheet(1)}
							multiline={false}
							placeholder={'digite sua observação'}
							keyboardType={'default'}
							onChangeText={setObservationInputText}
							onPressKeyboardSubmit={addObservation}
						/>
					</InputsContainer>
					<ObservationsFlatList
						data={observations}
						nestedScrollEnabled
						renderItem={renderObservationCard as ListRenderItem<unknown>}
						ListHeaderComponent={<VerticalSpacing height={2} />}
						ItemSeparatorComponent={() => <VerticalSpacing />}
						ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
						showsVerticalScrollIndicator={false}
					/>
				</BottomSheetViewContainer>
			</BottomSheetView>
		</BottomSheetModal>
	)
})

export { ObservationsBottomSheet }
