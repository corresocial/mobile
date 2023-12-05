import React, { useContext } from 'react'

import { EditContext } from '@contexts/EditContext'

import { SelectIncomeTypeScreenProps } from '@routes/Stack/UserStack/stackScreenProps'

import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import SaleWhiteIcon from '@assets/icons/sale-white.svg'
import ServiceWhiteIcon from '@assets/icons/service-white.svg'
import VacancyWhiteIcon from '@assets/icons/vacancy-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectIncomeType({ route, navigation }: SelectIncomeTypeScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveIncomeType = (routeNavigate: 'SaleStack' | 'ServiceStack' | 'VacancyStack', macroCategory: MacroCategoriesType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ macroCategory })
			navigation.goBack()
			return
		}

		navigation.navigate(routeNavigate)
	}

	return (
		<PostSelectButton
			title={'o que você quer postar de renda?'}
			highlightedWords={['renda']}
			headerBackgroundColor={theme.green2}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'compra ou venda'}
				highlightedWords={['compra', 'ou', 'venda']}
				shortDescription={'procurando/vendendo coisas novas ou usadas'}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={SaleWhiteIcon}
				svgIconScale={['70%', '70%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveIncomeType('SaleStack', 'sale')}
			/>
			<OptionButton
				label={'serviços'}
				highlightedWords={['serviços']}
				shortDescription={'procurando e/ou oferecendo um serviço'}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ServiceWhiteIcon}
				svgIconScale={['70%', '70%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveIncomeType('ServiceStack', 'service')}
			/>
			<OptionButton
				label={'vagas'}
				highlightedWords={['vagas']}
				shortDescription={'procurando/oferecendo vaga ou profissional'}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={VacancyWhiteIcon}
				svgIconScale={['70%', '70%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveIncomeType('VacancyStack', 'vacancy')}
			/>
		</PostSelectButton>
	)
}

export { SelectIncomeType }
