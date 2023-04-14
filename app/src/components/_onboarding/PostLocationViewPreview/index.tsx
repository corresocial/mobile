import React from 'react'

import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import {
	generateLocationHeaderText,
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
	initialValue?: LatLong
	navigateBackwards: () => void
	saveLocationView: () => void
}

function PostLocationViewPreview({
	backgroundColor,
	locationViewSelected,
	postRange,
	initialValue,
	navigateBackwards,
	saveLocationView
}: PostLocationViewPreviewProps) {
	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(22)}
				centralized
				backgroundColor={backgroundColor}
				borderBottomWidth={0}
			>
				<BackButton onPress={navigateBackwards} />
				<InfoCard
					title={`${getRelativeRange(postRange)} - ${getRelativeLocationView(locationViewSelected)}`}
					titleFontSize={18}
					description={generateLocationHeaderText(locationViewSelected, postRange)}
					highlightedWords={[`${getRelativeRange(postRange)},`, getRelativeRange(postRange), getRelativeLocationView(locationViewSelected), getPossessivePronoun(postRange)]}
					height={'100%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<MapContainer>
				<CustomMapView
					regionCoordinate={initialValue}
					markerCoordinate={initialValue}
					CustomMarker={getLocationViewIcon(locationViewSelected)}
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
					svgIconScale={['40%', '25%']}
					onPress={saveLocationView}
				/>
			</ButtonContainerBottom>
		</Container>
	)
}

export { PostLocationViewPreview }
