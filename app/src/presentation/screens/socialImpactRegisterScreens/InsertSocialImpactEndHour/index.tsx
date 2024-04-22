import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertSocialImpactEndHourScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { theme } from '@common/theme'

import { PostTime } from '@components/_onboarding/PostTime'

function InsertSocialImpactEndHour({ route, navigation }: InsertSocialImpactEndHourScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour: '' })
			navigation.goBack()
		}
	}

	const saveEndTime = (dateTime: Date) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour: dateTime })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				customTitle={'que horas termina?'}
				customHighlight={['horas', 'termina']}
				initialValue={editModeIsTrue() ? route.params?.initialValue : undefined}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertSocialImpactEndHour }
