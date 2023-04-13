import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSaleRangeScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { PostRange } from '../../../components/_onboarding/PostRange'

function SelectSaleRange({ navigation }: SelectSaleRangeScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)

	const savePostRange = (postRange: PostRangeType) => {
		setSaleDataOnContext({ range: postRange })
		navigation.navigate('SelectLocationView')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.green2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectSaleRange }
