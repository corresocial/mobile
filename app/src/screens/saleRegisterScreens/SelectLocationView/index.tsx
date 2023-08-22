import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectLocationViewScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'

function SelectLocationView({ route, navigation }: SelectLocationViewScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setSaleDataOnContext({ range: route.params?.initialValue?.postRange })
		}

		navigation.navigate('InsertSaleLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.green2}
				itemsColor={theme.green3}
				progress={[4, 5]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectLocationView }
