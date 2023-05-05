import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectServiceRangeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectServiceRange({ route, navigation }: SelectServiceRangeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (postRange: PostRangeType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
		}

		setServiceDataOnContext({ range: postRange })
		navigation.navigate('SelectLocationView', {
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.purple2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectServiceRange }
