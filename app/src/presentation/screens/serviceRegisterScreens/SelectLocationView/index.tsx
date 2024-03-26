import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ServiceContext } from '@contexts/ServiceContext'

import { SelectLocationViewScreenProps } from '@routes/Stack/ServiceStack/screenProps'
import { LocationViewType } from '@domain/post/entity/types'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectLocationView({ route, navigation }: SelectLocationViewScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setServiceDataOnContext({ range: route.params?.initialValue?.postRange })
		}

		navigation.navigate('InsertServicePrestationLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates,
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.green2}
				itemsColor={theme.green3}
				progress={[5, 5]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectLocationView }
