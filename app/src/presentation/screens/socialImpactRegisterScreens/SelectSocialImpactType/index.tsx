import React, { useContext, useEffect } from 'react'

import { SocialImpactType } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'
import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { SelectSocialImpactTypeScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import HandOnHeartWhiteIcon from '@assets/icons/handOnHeart-white.svg'
import HeartAndPersonWhiteIcon from '@assets/icons/heartAndPerson-white.svg'
import PaperInfoWhite from '@assets/icons/paperInfo-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectSocialImpactType({ route, navigation }: SelectSocialImpactTypeScreenProps) {
	const { getAditionalDataFromLastPost } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!editModeIsTrue()) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveMacroCategory = (macroCategory: SocialImpactType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ macroCategory })
			return navigation.goBack()
		}
	}

	return (
		<PostSelectButton
			title={'você está postando \num informativo, \num iniciativa social, \nou uma doação?'}
			highlightedWords={['informativo', 'iniciativa', 'social', 'doação']}
			headerBackgroundColor={theme.colors.pink[2]}
			backgroundColor={theme.colors.white[3]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'conteúdo \ninformativo'}
				highlightedWords={['\ninformativo']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={PaperInfoWhite}
				svgIconScale={['45%', '45%']}
				leftSideColor={theme.colors.pink[3]}
				leftSideWidth={'25%'}
				onPress={() => saveMacroCategory('informative')}
			/>
			<OptionButton
				label={'iniciativa social'}
				highlightedWords={['social']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={HeartAndPersonWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.colors.pink[3]}
				leftSideWidth={'25%'}
				onPress={() => saveMacroCategory('iniciative')}
			/>
			<OptionButton
				label={'doação ou \nvoluntariado'}
				highlightedWords={['doação', '\nvoluntariado']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={HandOnHeartWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.colors.pink[3]}
				leftSideWidth={'25%'}
				onPress={() => saveMacroCategory('donation')}
			/>
		</PostSelectButton>
	)
}

export { SelectSocialImpactType }
