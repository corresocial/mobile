import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectEventRepeatScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { EventRepeatType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostRepeat } from '../../../components/_onboarding/PostRepeat'

function SelectEventRepeat({ route, navigation }: SelectEventRepeatScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveCultureRepeat = async (repeat: EventRepeatType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ repeat })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ repeat })
		navigation.navigate('InsertCultureStartDate')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<PostRepeat
				backgroundColor={theme.blue2}
				itemsColor={theme.blue3}
				navigateBackwards={() => navigation.goBack()}
				savePostRepeat={saveCultureRepeat}
			/>
		</>
	)
}

export { SelectEventRepeat }
