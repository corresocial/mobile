import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { ListRenderItem, TextInput } from 'react-native'
import { useTheme } from 'styled-components'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

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

const ObservationsBottomSheet = forwardRef((_, ref) => {
	const theme = useTheme()

	const [observationsList, setObservationsList] = useState<CitizenRegisterQuestionObservation[]>([])
	const [observationInputText, setObservationInputText] = useState<string>('')

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)
	const observationInputRef = useRef<TextInput>(null)

	useImperativeHandle(ref, () => ({
		show: () => {
			bottomSheetModalRef.current?.present()
		}
	}))

	const addNewObservation = () => {
		if (!observationInputText) return
		const observations = [
			...observationsList, // CURRENT Anexar id da questão à observação
			{ questionId: `${observationInputText.length}`, message: observationInputText } as CitizenRegisterQuestionObservation
		]
		setObservationsList(observations)
		setObservationInputText('')
	}

	const deleteObservation = (id: string) => {
		const filteredObservations = observationsList.filter((observationObj) => observationObj.questionId !== id) // CURRENT diferenciar question id de index no array
		setObservationsList(filteredObservations)
	}

	const snapBottomSheet = (index: number) => {
		setTimeout(() => bottomSheetModalRef.current?.snapToIndex(index), 100)
	}

	const closeBottomSheet = () => {
		bottomSheetModalRef.current?.close()
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
				observationText={item.message}
				questionId={item.questionId}
				deleteObservation={deleteObservation}
			/>
		)
	}

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={0}
			snapPoints={[relativeScreenHeight(50), relativeScreenHeight(80)]}
			handleComponent={renderCustomHeader}
			backgroundStyle={bottomSheetBackgroundStyle}
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
							onPressKeyboardSubmit={addNewObservation}
						/>
					</InputsContainer>
					<ObservationsFlatList
						data={observationsList}
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
