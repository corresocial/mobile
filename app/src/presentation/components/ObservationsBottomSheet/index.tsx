import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import { FlatListItem } from 'src/presentation/types'

import { BottomSheetHeaderContainer, BottomSheetHeaderText, BottomSheetViewContainer, CloseModalArea, HeaderTitleContainer, InputsContainer, ObservationsFlatList } from './styles'
import DownArrowIcon from '@assets/icons/angleDown-white.svg'
import ObservationIcon from '@assets/icons/description-white.svg'
import AddIcon from '@assets/icons/plus-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { ObservationCard } from '@components/_cards/ObservationCard'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

// CURRENT alterar para a tipagem correta
interface observation {
	questionId: number
	questionText: string
}

function ObservationsBottomSheet() {
	const [observationsList, setObservationsList] = useState<observation[]>([])
	const [isUsingInput, setIsUsingInput] = useState<boolean>(false)
	const [inputText, setInputText] = useState<string>('')

	const [modalIndex, setModalIndex] = useState<number>(1)

	useEffect(() => {
		openModal()
	}, [])

	const theme = useTheme()

	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	const handleSheetChanges = useCallback((index: number) => {
		setIsUsingInput(index === 1)
		setModalIndex(index)
	}, [])

	const openModal = () => {
		bottomSheetModalRef.current?.present()
	}

	const collapseModal = () => {
		if (modalIndex === 0) {
			bottomSheetModalRef.current?.close()
		} else {
			snapModal(0)
		}
	}

	const snapModal = (index: number) => {
		bottomSheetModalRef.current?.snapToIndex(index)
	}

	const addButtonHandler = () => {
		snapModal(1)
		setIsUsingInput(true)
	}

	const insertObservation = (observationObj: observation) => {
		const observations = [...observationsList, observationObj]
		setObservationsList(observations)
	}

	const deleteObservation = (id: number) => {
		const filteredObservations = observationsList.filter((observationObj) => observationObj.questionId !== id) // CURRENT diferenciar question id de index no array
		setObservationsList(filteredObservations)
	}

	const renderCustomHeader = () => {
		return (
			<BottomSheetHeaderContainer>
				<HeaderTitleContainer>
					<ObservationIcon height={relativeScreenDensity(20)}/>
					<BottomSheetHeaderText>{'observações'}</BottomSheetHeaderText>
				</HeaderTitleContainer>
				<CloseModalArea 
					activeOpacity={1} 
					onPress={collapseModal}
				>
					<DownArrowIcon width={30} height={30}/>
				</CloseModalArea>
			</BottomSheetHeaderContainer>
		) 
	}

	const renderObservationCard = ({ item }: FlatListItem<observation>) => {
		return (
			<ObservationCard 
				observationText={item.questionText} 
				questionId={item.questionId} 
				onDeleteObservation={deleteObservation}
			/>
		)
	}

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={1}
			snapPoints={[relativeScreenHeight(20), relativeScreenHeight(80)]}
			handleComponent={renderCustomHeader}
			onChange={handleSheetChanges}
		>
			<BottomSheetView>
				<BottomSheetViewContainer>
					<InputsContainer>
						{
							isUsingInput ? (
								<DefaultInput
									value={inputText}
									defaultBackgroundColor={theme.white3}
									validBackgroundColor={theme.white3}
									lastInput
									fontSize={16}
									textIsValid={!!inputText}
									multiline
									placeholder={'digite sua observação'}
									keyboardType={'default'}
									onChangeText={setInputText}
								/> // CURRENT default inpu ta flickando ao digitar / dúvida: como fazer para confirmar o input?
							) : (
								<SmallButton 
									height={relativeScreenDensity(60)} 
									onPress={addButtonHandler} 
									SvgIcon={AddIcon} 
									svgScale={['30%', '10%']}
									label={'Adicionar Observação'} 
									fontSize={relativeScreenDensity(17)}
									flexDirection={'row-reverse'}
									labelColor={theme.black4}
								/>
							)
						}
						
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
}

export { ObservationsBottomSheet }