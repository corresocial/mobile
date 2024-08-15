import React, { useContext } from 'react'

import { ExhibitionPlaceType } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectSocialImpactExhibitionRangeScreenProps } from '@routes/Stack/SocialImpactStack/screenProps'

import BrazilWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectSocialImpactExhibitionRange({ route, navigation }: SelectSocialImpactExhibitionRangeScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveSocialImpactExhibitionRange = (exhibitionPlace: ExhibitionPlaceType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ exhibitionPlace })
			return navigation.goBack()
		}
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'onde essa iniciativa atua?'}
			highlightedWords={['onde']}
			headerBackgroundColor={theme.colors.pink[2]}
			backgroundColor={theme.colors.white[3]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'em um bairro'}
				highlightedWords={['bairro']}
				labelSize={16}
				relativeHeight={'25%'}
				SvgIcon={PinWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.colors.pink[3]}
				leftSideWidth={'25%'}
				onPress={() => saveSocialImpactExhibitionRange('near')}
			/>
			<OptionButton
				label={'em uma cidade'}
				highlightedWords={['cidade']}
				labelSize={16}
				relativeHeight={'25%'}
				SvgIcon={CityWhiteIcon}
				svgIconScale={['55%', '55%']}
				leftSideColor={theme.colors.pink[3]}
				leftSideWidth={'25%'}
				onPress={() => saveSocialImpactExhibitionRange('city')}
			/>
			<OptionButton
				label={'no brasil inteiro'}
				highlightedWords={['brasil', 'inteiro']}
				labelSize={16}
				relativeHeight={'25%'}
				SvgIcon={BrazilWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.colors.pink[3]}
				leftSideWidth={'25%'}
				onPress={() => saveSocialImpactExhibitionRange('country')}
			/>
		</PostSelectButton>
	)
}

export { SelectSocialImpactExhibitionRange }
