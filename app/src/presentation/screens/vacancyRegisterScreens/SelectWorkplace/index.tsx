import React, { useContext } from 'react'

import { WorkplaceType } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import { SelectWorkplaceScreenProps } from '@routes/Stack/VacancyStack/screenProps'

import ComputerAndPhoneWhiteIcon from '@assets/icons/computerAndPhone-white.svg'
import ShopWhiteIcon from '@assets/icons/shop-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectWorkplace({ route, navigation }: SelectWorkplaceScreenProps) {
	const { isSecondPost, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveWorkplaceType = (workplace: WorkplaceType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ workplace })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ workplace })

		navigation.navigate('SelectVacancyType')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'qual é o local de trabalho?'}
			highlightedWords={['local,', 'de', 'trabalho']}
			headerBackgroundColor={theme.green2}
			backgroundColor={theme.white3}
			progress={[4, isSecondPost ? 6 : 7]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'vaga \npresencial'}
				highlightedWords={['\npresencial']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ShopWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('presential')}
			/>
			<OptionButton
				label={'vaga homeoffice'}
				highlightedWords={['homeoffice']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ComputerAndPhoneWhiteIcon}
				svgIconScale={['55%', '55%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('homeoffice')}
			/>
			<OptionButton
				label={'vaga híbrida'}
				highlightedWords={['híbrida']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ShopWhiteIcon}
				SecondSvgIcon={ComputerAndPhoneWhiteIcon}
				svgIconScale={['40%', '55%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('hybrid')}
			/>
		</PostSelectButton>
	)
}

export { SelectWorkplace }
