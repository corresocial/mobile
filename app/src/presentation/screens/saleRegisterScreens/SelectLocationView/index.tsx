import React from 'react'
import { StatusBar } from 'react-native'

import { LocationViewType } from '@domain/post/entity/types'

import { useIncomeContext } from '@contexts/IncomeContext'

import { SelectLocationViewScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectLocationView({ route, navigation }: SelectLocationViewScreenProps) {
	const { setIncomeDataOnContext } = useIncomeContext()

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setIncomeDataOnContext({ range: route.params?.initialValue?.postRange })
		}

		navigation.navigate('SelectIncomeLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.colors.green[2]}
				itemsColor={theme.colors.green[3]}
				progress={[6, 6]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectLocationView }
