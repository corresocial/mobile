import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureRangeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { CultureContext } from '../../../contexts/CultureContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectCultureRange({ route, navigation }: SelectCultureRangeScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (postRange: PostRangeType) => {
		const { eventPlaceModality } = cultureDataContext

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ range: postRange })
		if (eventPlaceModality !== 'online') {
			navigation.navigate('SelectCultureLocationView')
		} else {
			navigation.navigate('InsertEntryValue')
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.blue2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[3, 4]}
			/>
		</>
	)
}

export { SelectCultureRange }
