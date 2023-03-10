import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import Uncheck from '../../../assets/icons/uncheck.svg'
import Check from '../../../assets/icons/check.svg'

import { LocationViewPreviewScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { getLocationViewDescription, getLocationViewHighlightedWords, getLocationViewIcon, getLocationViewTitle } from '../../../utils/locationMessages'

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

	return (
		<Container >
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.green2}
				borderBottomWidth={0}
			>
				<InfoCard
					height={'100%'}
					color={theme.white3}
					title={getLocationViewTitle(route.params.locationView)}
					description={getLocationViewDescription(route.params.locationView)}
					highlightedWords={getLocationViewHighlightedWords(route.params.locationView)}
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
					flexDirection={'row-reverse'}
					color={theme.red3}
					label={'não curti, voltar'}
					highlightedWords={['não', 'curti']}
					labelColor={theme.white3}
					fontSize={16}
					SvgIcon={Uncheck}
					svgIconScale={['30%', '20%']}
					onPress={() => navigation.goBack()}
				/>
				<PrimaryButton
					flexDirection={'row-reverse'}
					color={theme.green3}
					label={'isso mesmo, continuar'}
					highlightedWords={['isso', 'mesmo']}
					fontSize={16}
					labelColor={theme.white3}
					SvgIcon={Check}
					svgIconScale={['30%', '20%']}
					onPress={saveLocation}
				/>
			</ButtonContainerBottom>
		</Container>
	)
}

export { LocationViewPreview }
