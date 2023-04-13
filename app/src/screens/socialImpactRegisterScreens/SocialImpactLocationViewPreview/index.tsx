import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { getLocationViewDescription, getLocationViewHighlightedWords, getLocationViewIcon, getLocationViewTitle } from '../../../utils/locationMessages'

import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { SocialImpactLocationViewPreviewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function SocialImpactLocationViewPreview({ navigation, route }: SocialImpactLocationViewPreviewScreenProps) {
	const { socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { editDataContext, addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [locationViewSelected, setLocationViewSelected] = useState<LocationViewType>()
	const [markerCoordinate] = useState(
		route.params?.editMode
			? {
				...editDataContext?.unsaved.location?.coordinates,
				...defaultDeltaCoordinates
			}
			: {
				...socialImpactDataContext?.location?.coordinates,
				...defaultDeltaCoordinates
			}
	)

	useEffect(() => {
		const locationView = getLocationViewFromRouteParams()
		setLocationViewSelected(locationView)
	}, [])

	const getLocationViewFromRouteParams = () => route.params.locationView

	const saveLocation = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ locationView: route.params.locationView })
			navigation.pop(2)
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({
			locationView: locationViewSelected
		})
		navigation.navigate('SelectDaysOfWeek')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container >
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.pink2}
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
					locationView={locationViewSelected}
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
					SecondSvgIcon={XWhiteIcon}
					svgIconScale={['40%', '18%']}
					onPress={() => navigation.goBack()}
				/>
				<PrimaryButton
					color={theme.green3}
					label={'isso mesmo, continuar'}
					highlightedWords={['isso', 'mesmo']}
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

export { SocialImpactLocationViewPreview }
