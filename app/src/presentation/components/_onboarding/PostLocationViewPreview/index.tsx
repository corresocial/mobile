import React, { useState } from 'react'

import { LatLong, LocationViewType, PostRange } from '@services/firebase/types'

import { ButtonContainerBottom, Container, MapContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InfoCard } from '@components/_cards/InfoCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { UiLocationUtils } from '@utils-ui/location/UiLocationUtils'
import { CustomMapView } from '../../CustomMapView'

const {
	getPossessivePronounByRange,
	getPostRangeLabel,
	getLocationViewDescription,
	generateLocationHeaderText,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getLocationViewLabel,
} = UiLocationUtils()

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
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={backgroundColor}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => (!firstStep ? setFirstStep(true) : navigateBackwards())} />
				<InfoCard
					title={
						firstStep
							? `localização⠀ \n${getLocationViewLabel(locationViewSelected)}`
							: `seu alcance\n ●  ${getPostRangeLabel(postRange)}`
					}
					titleFontSize={22}
					description={
						firstStep
							? getLocationViewDescription(locationViewSelected)
							: generateLocationHeaderText(locationViewSelected, postRange)
					}
					highlightedWords={
						firstStep
							? getLocationViewHighlightedWords(locationViewSelected)
							: ['alcance\n', getPossessivePronounByRange(postRange), getPostRangeLabel(postRange)]
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
