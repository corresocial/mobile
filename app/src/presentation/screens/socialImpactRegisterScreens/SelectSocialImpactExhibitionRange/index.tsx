import React, { useContext } from 'react'

import { EditContext } from '@contexts/EditContext'
import { SocialImpactContext } from '@contexts/SocialImpactContext'

import { ExhibitionPlaceType } from '@services/firebase/types'

import BrazilWhiteIcon from '@assets/icons/brazil-white.svg'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import PinWhiteIcon from '@assets/icons/pin-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

import { SelectSocialImpactExhibitionRangeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

function SelectSocialImpactExhibitionRange({ route, navigation }: SelectSocialImpactExhibitionRangeScreenProps) {
	const { isSecondPost, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveSocialImpactExhibitionRange = (exhibitionPlace: ExhibitionPlaceType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ exhibitionPlace })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ exhibitionPlace })
		navigation.navigate('InsertSocialImpactDescription')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'onde essa iniciativa atua?'}
			highlightedWords={['onde']}
			headerBackgroundColor={theme.pink2}
			backgroundColor={theme.white3}
			progress={[3, isSecondPost ? 5 : 6]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'em um bairro'}
				highlightedWords={['bairro']}
				labelSize={16}
				relativeHeight={'25%'}
				SvgIcon={PinWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.pink3}
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
				leftSideColor={theme.pink3}
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
				leftSideColor={theme.pink3}
				leftSideWidth={'25%'}
				onPress={() => saveSocialImpactExhibitionRange('country')}
			/>
		</PostSelectButton>
	)
}

export { SelectSocialImpactExhibitionRange }
