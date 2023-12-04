import React, { useContext, useEffect } from 'react'

import { SocialImpactContext } from '@contexts/SocialImpactContext'

import GiftWhiteIcon from '@assets/icons/megaphone-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '../../../components/_buttons/OptionButton'
import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { SelectSocialImpactPurposeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

function SelectSocialImpactPurpose({ route, navigation }: SelectSocialImpactPurposeScreenProps) {
	const { isSecondPost, setSocialImpactDataOnContext, getAditionalDataFromLastPost } = useContext(SocialImpactContext)
	// const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	// const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSocialImpactPurpose = (lookingFor: boolean) => {
		/* if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemStatus })
			navigation.goBack()
			return
		} */

		setSocialImpactDataOnContext({ lookingFor })
		navigation.navigate('SelectSocialImpactCategory')
	}

	return (
		<PostSelectButton
			title={'você está procurando ou anunciando isso?'}
			highlightedWords={['procurando', 'anunciando']}
			headerBackgroundColor={theme.pink2}
			backgroundColor={theme.white3}
			progress={[1, isSecondPost ? 5 : 6]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando'}
				highlightedWords={['procurando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={QuestionMarkWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.pink3}
				leftSideWidth={'25%'}
				onPress={() => saveSocialImpactPurpose(true)}
			/>
			<OptionButton
				label={'divulgando'}
				highlightedWords={['divulgando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={GiftWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.pink3}
				leftSideWidth={'25%'}
				onPress={() => saveSocialImpactPurpose(false)}
			/>
		</PostSelectButton>
	)
}

export { SelectSocialImpactPurpose }
