import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'
import { ButtonContainerBottom, Container, MapContainer } from './styles'
import Uncheck from '../../../assets/icons/uncheck.svg'
import Check from '../../../assets/icons/check.svg'
import MapPointOrange from '../../../assets/icons/mapPoint-orange.svg'
import Eye from '../../../assets/icons/eye.svg'
import EyeHalfTraced from '../../../assets/icons/eyeHalfTraced.svg'
import EyeTraced from '../../../assets/icons/eyeTraced.svg'

import { LocationViewPreviewScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomMapView } from '../../../components/CustomMapView'
import { InfoCard } from '../../../components/_cards/InfoCard'

const defaultDeltaCoordinates = {
	latitudeDelta: 0.004,
	longitudeDelta: 0.004
}

function LocationViewPreview({ navigation, route }: LocationViewPreviewScreenProps) {
	const { serviceDataContext, setServiceDataOnContext } = useContext(ServiceContext)

	const [locationViewSelected, setLocationViewSelected] = useState<LocationViewType>()
	const [markerCoordinate] = useState({
		...serviceDataContext?.address?.coordinates,
		...defaultDeltaCoordinates
	})

	useEffect(() => {
		const locationView = getLocationViewFromRouteParams()
		setLocationViewSelected(locationView)
	}, [])

	const getLocationViewFromRouteParams = () => route.params.locationView

	const getLocationViewTitle = () => {
		switch (locationViewSelected as LocationViewType) {
			case 'private': return ' localização\n privada'
			case 'approximate': return 'localização\n aproximada'
			case 'public': return 'localização\n pública'
			default: return 'switch option unfount'
		}
	}

	const getLocationViewDescription = () => {
		switch (locationViewSelected as LocationViewType) {
			case 'private': return 'os usuários podem ver seu perfil, mas não tem acesso a sua localização.'
			case 'approximate': return 'os usuários podem a sua região aproximada.'
			case 'public': return 'os usuários podem ver exatamente onde você está.'
			default: return 'switch option unfount'
		}
	}

	const getLocationViewHighlightedWords = () => {
		switch (locationViewSelected as LocationViewType) {
			case 'private': return ['privada', 'não', 'tem', 'acesso', 'a', 'sua', 'localização']
			case 'approximate': return ['aproximada', 'a', 'sua', 'região', 'aproximada']
			case 'public': return ['pública', 'exatamente', 'onde', 'você', 'está']
			default: return []
		}
	}

	const getLocationViewIcon = () => {
		switch (locationViewSelected as LocationViewType) {
			case 'private': return EyeTraced
			case 'approximate': return EyeHalfTraced
			case 'public': return Eye
			default: return MapPointOrange
		}
	}

	const saveLocation = () => {
		setServiceDataOnContext({
			locationView: locationViewSelected
		})
		navigation.navigate('SelectDeliveryMethod')
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'25%'}
				centralized
				backgroundColor={theme.purple2}
				borderBottomWidth={0}
			>
				<InfoCard
					height={'100%'}
					color={theme.white3}
					title={getLocationViewTitle()}
					description={getLocationViewDescription()}
					highlightedWords={getLocationViewHighlightedWords()}
				/>
			</DefaultHeaderContainer>
			<MapContainer>
				<CustomMapView
					regionCoordinate={markerCoordinate}
					markerCoordinate={markerCoordinate}
					CustomMarker={getLocationViewIcon()}
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
