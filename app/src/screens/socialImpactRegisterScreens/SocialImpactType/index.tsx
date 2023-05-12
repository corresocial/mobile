import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import PaperInfoWhite from '../../../assets/icons/paperInfo-white.svg'
import HeartAndPersonWhiteIcon from '../../../assets/icons/heartAndPerson-white.svg'
import HandOnHeartWhiteIcon from '../../../assets/icons/handOnHeart-white.svg'

import { SelectSocialImpactTypeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { SocialImpactType } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'

function SelectSocialImpactType({ route, navigation }: SelectSocialImpactTypeScreenProps) {
	const { setSocialImpactDataOnContext, getAditionalDataFromLastPost } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const saveWorkplaceType = (socialImpactType: SocialImpactType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ socialImpactType })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ socialImpactType })

		navigation.navigate('SelectSocialImpactCategory')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'você está postando um informativo, um iniciativa social, ou uma doação?'}
			highlightedWords={['informativo', 'iniciativa', 'social', 'doação']}
			backgroundColor={theme.pink2}
			navigateBackwards={() => navigation.goBack()}
		>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'25%'}
				labelColor={theme.black4}
				SecondSvgIcon={PaperInfoWhite}
				label={'conteúdo \ninformativo'}
				highlightedWords={['\ninformativo']}
				onPress={() => saveWorkplaceType('informative')}
			/>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'25%'}
				labelColor={theme.black4}
				SecondSvgIcon={HeartAndPersonWhiteIcon}
				label={'iniciativa social'}
				highlightedWords={['social']}
				onPress={() => saveWorkplaceType('iniciative')}
			/>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'25%'}
				labelColor={theme.black4}
				SecondSvgIcon={HandOnHeartWhiteIcon}
				label={'doação ou \nvoluntariado'}
				highlightedWords={['doação', '\nvoluntariado']}
				onPress={() => saveWorkplaceType('donation')}
			/>
		</PostSelectButton>
	)
}

export { SelectSocialImpactType }
