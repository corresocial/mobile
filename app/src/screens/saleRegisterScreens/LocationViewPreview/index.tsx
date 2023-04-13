import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { LocationViewPreviewScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { generateLocationHeaderText, getLocationViewIcon, getPossessivePronoun, getRelativeLocationView, getRelativeRange } from '../../../utils/locationMessages'
import { relativeScreenHeight } from '../../../common/screenDimensions'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function LocationViewPreview({ route, navigation }: LocationViewPreviewScreenProps) {
	const { saleDataContext, setSaleDataOnContext } = useContext(SaleContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [markerCoordinate] = useState(
		route.params?.editMode
			? {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
			: {
				...saleDataContext?.location?.coordinates,
				...defaultDeltaCoordinates
			}
	)

	const saveLocation = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ locationView: route.params.locationView })
			navigation.pop(2)
			navigation.goBack()
			return
		}

		setSaleDataOnContext({
			locationView: route.params.locationView
		})
		navigation.navigate('SelectDeliveryMethod')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	const { locationView } = route.params
	const { range: postRange } = saleDataContext

	return (
		<Container >
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(20)}
				centralized
				backgroundColor={theme.green2}
				borderBottomWidth={0}
			>
				<InfoCard
					title={`${getRelativeRange(postRange)} - ${getRelativeLocationView(locationView)}`}
					titleFontSize={18}
					description={generateLocationHeaderText(locationView, postRange)}
					highlightedWords={[`${getRelativeRange(postRange)},`, getRelativeRange(postRange), getRelativeLocationView(locationView), getPossessivePronoun(postRange)]}
					height={'100%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<MapContainer>
				<CustomMapView
					regionCoordinate={markerCoordinate}
					markerCoordinate={markerCoordinate}
					CustomMarker={getLocationViewIcon(route.params.locationView)}
					locationView={route.params.locationView}
				/>
			</MapContainer>
			<ButtonContainerBottom>
				<PrimaryButton
					color={theme.green3}
					label={'continuar'}
					highlightedWords={['continuar']}
					fontSize={16}
					labelColor={theme.white3}
					SecondSvgIcon={CheckWhiteIcon}
					svgIconScale={['40%', '25%']}
					onPress={saveLocation}
				/>
			</ButtonContainerBottom>
		</Container>
	)
}

export { LocationViewPreview }
