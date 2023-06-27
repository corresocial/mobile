import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureRangeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { EditContext } from '../../../contexts/EditContext'
import { CultureContext } from '../../../contexts/CultureContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectCultureRange({ route, navigation }: SelectCultureRangeScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (postRange: PostRangeType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
			navigation.goBack()
		}

		setCultureDataOnContext({ range: postRange })

		navigation.navigate('SelectCultureLocationView', {
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue
		})
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
