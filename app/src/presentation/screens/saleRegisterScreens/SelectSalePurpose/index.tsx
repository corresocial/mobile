import React, { useContext } from 'react'

import { SaleContext } from '@contexts/SaleContext'

import { SelectSalePurposeScreenProps } from '@routes/Stack/SaleStack/stackScreenProps'

import GiftWhiteIcon from '@assets/icons/megaphone-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectSalePurpose({ route, navigation }: SelectSalePurposeScreenProps) {
	const { isSecondPost, setSaleDataOnContext } = useContext(SaleContext)

	// const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveSalePurpose = (lookingFor: boolean) => {
		/* if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemStatus })
			navigation.goBack()
			return
		} */

		setSaleDataOnContext({ lookingFor })
		navigation.navigate('SelectSaleCategory')
	}

	return (
		<PostSelectButton
			title={'você está procurando ou anunciando este item?'}
			highlightedWords={['procurando', 'anunciando']}
			headerBackgroundColor={theme.green2}
			backgroundColor={theme.white3}
			progress={[2, isSecondPost ? 5 : 6]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando'}
				highlightedWords={['procurando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={QuestionMarkWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveSalePurpose(true)}
			/>
			<OptionButton
				label={'anunciando'}
				highlightedWords={['anunciando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={GiftWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveSalePurpose(false)}
			/>
		</PostSelectButton>
	)
}

export { SelectSalePurpose }
