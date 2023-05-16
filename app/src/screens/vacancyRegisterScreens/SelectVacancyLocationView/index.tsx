import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyLocationViewScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'

function SelectVacancyLocationView({ route, navigation }: SelectVacancyLocationViewScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setVacancyDataOnContext({ range: route.params?.initialValue?.postRange })
		}

		navigation.navigate('InsertWorkplaceLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
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
