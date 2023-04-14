import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectVacancyRangeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'
import { PostRange } from '../../../components/_onboarding/PostRange'

import { VacancyContext } from '../../../contexts/VacancyContext'

function SelectVacancyRange({ navigation }: SelectVacancyRangeScreenProps) {
	const { vacancyDataContext, setVacancyDataOnContext } = useContext(VacancyContext)

	const savePostRange = (postRange: PostRangeType) => {
		const { workplace } = vacancyDataContext

		setVacancyDataOnContext({ range: postRange })

		if (workplace !== 'homeoffice') {
			// navigation.navigate('SelectVacancyLocationView')
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
