import React, { useContext } from 'react'

import { ItemStatus } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'

import { SelectItemStatusScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import GiftWhiteIcon from '@assets/icons/gift-white.svg'
import UsedLabelWhiteIcon from '@assets/icons/usedLabel-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectItemStatus({ route, navigation }: SelectItemStatusScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveItemStatus = (itemStatus: ItemStatus) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemStatus })
			return navigation.goBack()
		}
	}

	return (
		<PostSelectButton
			title={'é novo ou usado?'}
			highlightedWords={['novo', 'usado']}
			headerBackgroundColor={theme.colors.green[2]}
			backgroundColor={theme.colors.white[3]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'item usado'}
				highlightedWords={['usado']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={UsedLabelWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.colors.green[3]}
				leftSideWidth={'25%'}
				onPress={() => saveItemStatus('used')}
			/>
			<OptionButton
				label={'item novo'}
				highlightedWords={['novo']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={GiftWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.colors.green[3]}
				leftSideWidth={'25%'}
				onPress={() => saveItemStatus('new')}
			/>
		</PostSelectButton>
	)
}

export { SelectItemStatus }
