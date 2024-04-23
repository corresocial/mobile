import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { usePetitionContext } from '@contexts/PetitionContext'

import { SelectPetitionRangeScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { theme } from '@common/theme'

import { PostRange } from '@components/_onboarding/PostRange'

function SelectPetitionRange({ route, navigation }: SelectPetitionRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setPetitionDataOnContext } = usePetitionContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePetitionRange = (pollRange: PetitionEntity['range']) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: pollRange })
			navigation.goBack()
			return
		}

		setPetitionDataOnContext({ range: pollRange })
		navigation.navigate('InsertPetitionLocation')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.purple2}
				itemsColor={theme.purple3}
				hiddenValues
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePetitionRange}
			/>
		</>
	)
}

export { SelectPetitionRange }
