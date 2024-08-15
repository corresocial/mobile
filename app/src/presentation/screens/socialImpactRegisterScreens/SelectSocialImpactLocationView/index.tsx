import React from 'react'
import { StatusBar } from 'react-native'

import { LocationViewType } from '@domain/post/entity/types'

import { SelectSocialImpactLocationViewScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectSocialImpactLocationView({ route, navigation }: SelectSocialImpactLocationViewScreenProps) {
	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			return navigation.navigate('SelectSocialImpactLocation', {
				locationView: locationViewType,
				editMode: editModeIsTrue(),
				initialValue: route.params?.initialValue?.coordinates
			})
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.colors.pink[2]}
				itemsColor={theme.colors.pink[3]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectSocialImpactLocationView }
