import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyLocationViewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'

function SelectVacancyLocationView({ route, navigation }: SelectVacancyLocationViewScreenProps) {
	const saveLocationViewType = (locationViewType: LocationViewType) => {
		navigation.navigate('InsertWorkplaceLocation', {
			locationView: locationViewType,
			...route.params
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.yellow2}
				progress={[4, 5]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectVacancyLocationView }
