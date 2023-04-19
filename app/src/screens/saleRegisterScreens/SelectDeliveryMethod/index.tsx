import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectDeliveryMethodScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { DeliveryMethod } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostDeliveryMethod } from '../../../components/_onboarding/PostDeliveryMethod'

function SelectDeliveryMethod({ route, navigation }: SelectDeliveryMethodScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveDeliveryMethod = (deliveryMethod: DeliveryMethod) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: deliveryMethod })
			navigation.goBack()
		} else {
			setSaleDataOnContext({ deliveryMethod })
		}

		navigation.navigate('SelectSaleFrequency')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostDeliveryMethod
				backgroundColor={theme.green2}
				progress={[5, 5]}
				navigateBackwards={() => navigation.goBack()}
				saveDeliveryMethod={saveDeliveryMethod}
			/>
		</>
	)
}

export { SelectDeliveryMethod }
