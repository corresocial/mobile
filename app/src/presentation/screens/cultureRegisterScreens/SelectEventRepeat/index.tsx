import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EventRepeatType } from '@domain/post/entity/types'

import { useCultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { SelectEventRepeatScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { theme } from '@common/theme'

import { PostRepeat } from '@components/_onboarding/PostRepeat'

function SelectEventRepeat({ route, navigation }: SelectEventRepeatScreenProps) {
	const { setCultureDataOnContext } = useCultureContext()
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
			<StatusBar backgroundColor={theme.colors.blue[2]} barStyle={'dark-content'} />
			<PostRepeat
				backgroundColor={theme.colors.blue[2]}
				itemsColor={theme.colors.blue[3]}
				navigateBackwards={() => navigation.goBack()}
				savePostRepeat={saveCultureRepeat}
			/>
		</>
	)
}

export { SelectEventRepeat }
