import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import SaleWhiteIcon from '../../../assets/icons/sale-white.svg'
import ServiceWhiteIcon from '../../../assets/icons/service-white.svg'
import VacancyWhiteIcon from '../../../assets/icons/vacancy-white.svg'

import { SelectIncomeTypeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { IncomeType } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { SaleContext } from '../../../contexts/SaleContext'
import { VacancyContext } from '../../../contexts/VacancyContext'

function SelectIncomeType({ route, navigation }: SelectIncomeTypeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	useEffect(() => {
		/* if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		} */
	}, [])

	const saveIncomeType = (routeNavigate: 'SaleStack' | 'ServiceStack' | 'VacancyStack') => {
		/* if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ incomeType })
			navigation.goBack()
			return
		} */

		navigation.navigate(routeNavigate)
	}

	// const editModeIsTrue = () => !!(route.params && route.params.editMode)

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
				onPress={() => saveIncomeType('SaleStack')}
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
				onPress={() => saveIncomeType('ServiceStack')}
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
				onPress={() => saveIncomeType('VacancyStack')}
			/>
		</PostSelectButton>
	)
}

export { SelectIncomeType }
