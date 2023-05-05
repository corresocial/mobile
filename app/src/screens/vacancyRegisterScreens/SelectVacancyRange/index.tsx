import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyRangeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectVacancyRange({ route, navigation }: SelectVacancyRangeScreenProps) {
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (postRange: PostRangeType) => {
		const { workplace } = vacancyDataContext

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
		}

		setVacancyDataOnContext({ range: postRange })
		if (workplace !== 'homeoffice') {
			navigation.navigate('SelectVacancyLocationView', {
				editMode: editModeIsTrue(),
				initialValue: route.params?.initialValue
			})
		} else {
			navigation.navigate('SelectWorkWeekdays')
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.yellow2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectVacancyRange }
