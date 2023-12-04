import React, { useContext } from 'react'

import { CultureContext } from '@contexts/CultureContext'
import { EditContext } from '@contexts/EditContext'

import { PlaceModalityType } from '@services/firebase/types'

import ComputerAndPhoneWhiteIcon from '@assets/icons/computerAndPhone-white.svg'
import ShopWhiteIcon from '@assets/icons/shop-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '../../../components/_buttons/OptionButton'
import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { SelectCulturePlaceModalityScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

function SelectCulturePlaceModality({ route, navigation }: SelectCulturePlaceModalityScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveEventPlaceModality = (eventPlaceModality: PlaceModalityType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ eventPlaceModality })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ eventPlaceModality })
		navigation.navigate('SelectCultureRange')
	}

	return (
		<PostSelectButton
			title={'é online ou presencial?'}
			highlightedWords={['online', 'presencial']}
			headerBackgroundColor={theme.blue2}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'online'}
				highlightedWords={['online']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ComputerAndPhoneWhiteIcon}
				svgIconScale={['55%', '55%']}
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveEventPlaceModality('online')}
			/>
			<OptionButton
				label={'presencial'}
				highlightedWords={['presencial']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ShopWhiteIcon}
				svgIconScale={['55%', '55%']}
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveEventPlaceModality('presential')}
			/>
			<OptionButton
				label={'presencial e online'}
				highlightedWords={['presencial', 'online']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ComputerAndPhoneWhiteIcon}
				SecondSvgIcon={ShopWhiteIcon}
				svgIconScale={['45%', '55%']}
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveEventPlaceModality('both')}
			/>
		</PostSelectButton>
	)
}

export { SelectCulturePlaceModality }
