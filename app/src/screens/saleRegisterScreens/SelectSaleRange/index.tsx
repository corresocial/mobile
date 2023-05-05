import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleRangeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectSaleRange({ route, navigation }: SelectSaleRangeScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePostRange = (postRange: PostRangeType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: postRange })
		}

		setSaleDataOnContext({ range: postRange })
		navigation.navigate('SelectLocationView', {
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.green2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectSaleRange }
