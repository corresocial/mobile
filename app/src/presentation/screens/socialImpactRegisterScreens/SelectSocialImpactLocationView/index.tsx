import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { LocationViewType } from '@domain/post/entity/types'

import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { SelectSocialImpactLocationViewScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import { theme } from '@common/theme'

import { PostLocationView } from '@components/_onboarding/PostLocationView'

function SelectSocialImpactLocationView({ route, navigation }: SelectSocialImpactLocationViewScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveLocationViewType = (locationViewType: LocationViewType) => {
		if (editModeIsTrue()) {
			setSocialImpactDataOnContext({ locationView: locationViewType })
		}

		navigation.navigate('InsertSocialImpactLocation', {
			locationView: locationViewType,
			editMode: editModeIsTrue(),
			initialValue: route.params?.initialValue?.coordinates
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<PostLocationView
				backgroundColor={theme.colors.pink[2]}
				itemsColor={theme.colors.pink[3]}
				progress={[6, 6]}
				saveLocationViewType={saveLocationViewType}
				navigateBackwards={() => navigation.goBack()}
			/>
		</>
	)
}

export { SelectSocialImpactLocationView }
