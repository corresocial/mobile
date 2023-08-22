import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { SelectSocialImpactLocationViewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { PostLocationView } from '../../../components/_onboarding/PostLocationView'
import { SocialImpactContext } from '../../../contexts/SocialImpactContext'

function SelectSocialImpactLocationView({ route, navigation }: SelectSocialImpactLocationViewScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setSocialImpactDataOnContext({ range: route.params?.initialValue?.postRange })
		}

		navigation.navigate('InsertSocialImpactLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.pink2}
				itemsColor={theme.pink3}
				progress={[3, 4]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectSocialImpactLocationView }
