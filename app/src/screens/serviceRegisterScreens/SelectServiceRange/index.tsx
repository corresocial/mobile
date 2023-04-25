import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectServiceRangeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PostRange as PostRangeType } from '../../../services/firebase/types'
import { PostRange } from '../../../components/_onboarding/PostRange'

import { ServiceContext } from '../../../contexts/ServiceContext'

function SelectServiceRange({ route, navigation }: SelectServiceRangeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const savePostRange = (postRange: PostRangeType) => {
		setServiceDataOnContext({ range: postRange })
		navigation.navigate('SelectLocationView')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.purple2}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[4, 5]}
			/>
		</>
	)
}

export { SelectServiceRange }
