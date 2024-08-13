import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { LocationViewType } from '@domain/post/entity/types'

import { useCultureContext } from '@contexts/CultureContext'

import { SelectCultureLocationViewScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectCultureLocationView({ route, navigation }: SelectCultureLocationViewScreenProps) {
	const { isSecondPost, setCultureDataOnContext } = useCultureContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setCultureDataOnContext({ locationView: locationViewType })
		}

		navigation.navigate('SelectCultureLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.colors.blue[2]}
				itemsColor={theme.colors.blue[3]}
				progress={[5, isSecondPost ? 4 : 5]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectCultureLocationView }
