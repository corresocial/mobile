import React from 'react'
import { StatusBar } from 'react-native'

import { LocationViewType } from '@domain/post/entity/types'

import { SelectCultureLocationViewScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectCultureLocationView({ route, navigation }: SelectCultureLocationViewScreenProps) {
	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			return navigation.navigate('SelectCultureLocation', {
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
				backgroundColor={theme.colors.blue[2]}
				itemsColor={theme.colors.blue[3]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectCultureLocationView }
