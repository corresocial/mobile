import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectCultureLocationViewScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'

function SelectCultureLocationView({ route, navigation }: SelectCultureLocationViewScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)

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
				progress={[3, 4]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectCultureLocationView }
