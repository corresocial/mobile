import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureLocationViewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'

function SelectCultureLocationView({ route, navigation }: SelectCultureLocationViewScreenProps) {
	const saveLocationViewType = (locationViewType: LocationViewType) => {
		navigation.navigate('InsertCultureLocation', {
			locationView: locationViewType,
			...route.params
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.blue2}
				progress={[3, 4]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectCultureLocationView }
