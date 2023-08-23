import React, { useState } from 'react'

import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import {
	generateLocationHeaderText,
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getPossessivePronoun,
	getRelativeLocationView,
	getRelativeRange
} from '../../../utils/locationMessages'

import { LatLong, LocationViewType, PostRange } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { BackButton } from '../../../components/_buttons/BackButton'

interface PostLocationViewPreviewProps {
	backgroundColor: string
	locationViewSelected: LocationViewType
	postRange: PostRange
	placeName: string
	placeColor: string
	initialValue?: LatLong
	navigateBackwards: () => void
	saveLocationView: () => void
}

function PostLocationViewPreview({
	backgroundColor,
	locationViewSelected,
	postRange,
	placeName,
	placeColor,
	initialValue,
	navigateBackwards,
	saveLocationView
}: PostLocationViewPreviewProps) {
	const [firstStep, setFirstStep] = useState(true)

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={backgroundColor}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => (!firstStep ? setFirstStep(true) : navigateBackwards())} />
				<InfoCard
					title={
						firstStep
							? `localização⠀ \n${getRelativeLocationView(locationViewSelected)}`
							: `seu alcance\n ●  ${getRelativeRange(postRange)}`
					}
					titleFontSize={18}
					description={
						firstStep
							? getLocationViewDescription(locationViewSelected)
							: generateLocationHeaderText(locationViewSelected, postRange)
					}
					highlightedWords={
						firstStep
							? getLocationViewHighlightedWords(locationViewSelected)
							: ['alcance\n', getPossessivePronoun(postRange), getRelativeRange(postRange)]
					}
					height={'100%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<MapContainer>
				<CustomMapView
					regionCoordinate={initialValue}
					markerCoordinate={initialValue}
					placeColor={placeColor}
					placeName={placeName}
					postRange={postRange}
					CustomMarker={firstStep ? getLocationViewIcon(locationViewSelected) : undefined}
					renderLimits={!firstStep}
					locationView={locationViewSelected}
				/>
			</MapContainer>
			<ButtonContainerBottom>
				<PrimaryButton
					color={theme.green3}
					label={'continuar'}
					fontSize={16}
					labelColor={theme.white3}
					SecondSvgIcon={CheckWhiteIcon}
					onPress={() => (firstStep ? setFirstStep(false) : saveLocationView())}
				/>
			</ButtonContainerBottom>
		</Container>
	)
}

export { PostLocationViewPreview }
