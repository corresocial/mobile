import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertSocialImpactEndDateScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { theme } from '@common/theme'

import { PostDate } from '@components/_onboarding/PostDate'

function InsertSocialImpactEndDate({ route, navigation }: InsertSocialImpactEndDateScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate: '' })
			navigation.goBack()
		}
	}

	const saveSocialImpactStartDate = (dateTime: Date) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endDate: dateTime })
			navigation.goBack()
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.pink[2]} barStyle={'dark-content'} />
			<PostDate
				backgroundColor={theme.colors.pink[2]}
				validationColor={theme.colors.pink[1]}
				customTitle={'que dia termina?'}
				customHighlight={['dia', 'termina']}
				initialValue={editModeIsTrue() ? route.params?.initialValue : undefined}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveDate={saveSocialImpactStartDate}
			/>
		</>
	)
}

export { InsertSocialImpactEndDate }
