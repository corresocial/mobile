import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import UsedLabelWhiteIcon from '../../../assets/icons/usedLabel-white.svg'
import GiftWhiteIcon from '../../../assets/icons/gift-white.svg'

import { SelectItemStatusScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { ItemStatus } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectItemStatus({ route, navigation }: SelectItemStatusScreenProps) {
	const { setSaleDataOnContext, getAditionalDataFromLastPost } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveItemStatus = (itemStatus: ItemStatus) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemStatus })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ itemStatus })
		navigation.navigate('SelectSaleCategory')
	}

	return (
		<PostSelectButton
			title={'é novo ou usado?'}
			highlightedWords={['novo', 'usado']}
			headerBackgroundColor={theme.green2}
			backgroundColor={theme.white3}
			progress={[1, 5]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'item usado'}
				highlightedWords={['usado']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={UsedLabelWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.green3}
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
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveItemStatus('new')}
			/>
		</PostSelectButton>
	)
}

export { SelectItemStatus }
