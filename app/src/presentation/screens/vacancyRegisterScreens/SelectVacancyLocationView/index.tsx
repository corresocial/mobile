import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { LocationViewType } from '@domain/post/entity/types'

import { VacancyContext } from '@contexts/VacancyContext'

import { SelectVacancyLocationViewScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectVacancyLocationView({ route, navigation }: SelectVacancyLocationViewScreenProps) {
	const { isSecondPost, setVacancyDataOnContext } = useContext(VacancyContext)

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
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.colors.green[2]}
				itemsColor={theme.colors.green[3]}
				progress={[7, isSecondPost ? 6 : 7]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectVacancyLocationView }
