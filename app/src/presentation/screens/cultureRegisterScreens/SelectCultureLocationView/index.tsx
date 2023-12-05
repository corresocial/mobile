import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { CultureContext } from '@contexts/CultureContext'

import { LocationViewType } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

import { SelectCultureLocationViewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

function SelectCultureLocationView({ route, navigation }: SelectCultureLocationViewScreenProps) {
	const { isSecondPost, setCultureDataOnContext } = useContext(CultureContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setCultureDataOnContext({ range: route.params?.initialValue?.postRange })
		}

		navigation.navigate('InsertCultureLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.blue2}
				itemsColor={theme.blue3}
				progress={[5, isSecondPost ? 4 : 5]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectCultureLocationView }
