import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { DeliveryMethod } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'
import { SaleContext } from '@contexts/SaleContext'

import { SelectDeliveryMethodScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { theme } from '@common/theme'

import { PostDeliveryMethod } from '@components/_onboarding/PostDeliveryMethod'

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
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<PostDeliveryMethod
				backgroundColor={theme.colors.green[2]}
				itemsColor={theme.colors.green[3]}
				navigateBackwards={() => navigation.goBack()}
				saveDeliveryMethod={saveDeliveryMethod}
			/>
		</>
	)
}

export { SelectDeliveryMethod }
