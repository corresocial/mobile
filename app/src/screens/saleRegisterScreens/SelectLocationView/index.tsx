import React from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectLocationViewScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'

function SelectLocationView({ route, navigation }: SelectLocationViewScreenProps) {
	const saveLocationViewType = (locationViewType: LocationViewType) => {
		navigation.navigate('InsertSaleLocation', {
			locationView: locationViewType,
			...route.params
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.green2}
				progress={[4, 5]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectLocationView }
