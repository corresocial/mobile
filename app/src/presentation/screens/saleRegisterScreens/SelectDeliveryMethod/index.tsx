import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { EditContext } from '@contexts/EditContext'
import { SaleContext } from '@contexts/SaleContext'

import { DeliveryMethod } from '@services/firebase/types'

import { theme } from '@common/theme'

import { PostDeliveryMethod } from '../../../components/_onboarding/PostDeliveryMethod'
import { SelectDeliveryMethodScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

function SelectDeliveryMethod({ route, navigation }: SelectDeliveryMethodScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveDeliveryMethod = (deliveryMethod: DeliveryMethod) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ deliveryMethod })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ deliveryMethod })
		navigation.navigate('SelectSaleFrequency')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<PostDeliveryMethod
				backgroundColor={theme.green2}
				itemsColor={theme.green3}
				navigateBackwards={() => navigation.goBack()}
				saveDeliveryMethod={saveDeliveryMethod}
			/>
		</>
	)
}

export { SelectDeliveryMethod }
