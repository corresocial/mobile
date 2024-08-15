import React, { forwardRef, ReactElement, useImperativeHandle, useRef } from 'react'

import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import { BottomSheetHeaderContainer, BottomSheetHeaderText, BottomSheetViewContainer, CloseModalArea, HeaderTitleContainer, bottomSheetBackgroundStyle } from './styles'
import DownArrowIcon from '@assets/icons/angleDown-white.svg'
import ObservationIcon from '@assets/icons/description-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

// Tipagem de forwardRef
export interface CustomBottomSheetRef {
	show: () => void
	close: () => void
}

interface CustomBottomSheetProps {
	content: ReactElement
	initialSnapPoint?: number
}

const CustomBottomSheet = forwardRef(({
	content,
	initialSnapPoint,
}: CustomBottomSheetProps, ref) => {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null)

	useImperativeHandle(ref, () => ({
		show: () => bottomSheetModalRef.current?.present(),
		close: () => bottomSheetModalRef.current?.close()
	}))

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

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={initialSnapPoint || 0}
			snapPoints={[relativeScreenHeight(50), relativeScreenHeight(85)]}
			handleComponent={renderCustomHeader}
			backgroundStyle={bottomSheetBackgroundStyle}
			backdropComponent={getBackgropBottomSheet}
			enableContentPanningGesture={false}
		>
			<BottomSheetView>
				<BottomSheetViewContainer>
					{content}
				</BottomSheetViewContainer>
			</BottomSheetView>
		</BottomSheetModal>
	)
})

export { CustomBottomSheet }
