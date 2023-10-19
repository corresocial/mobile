import React, { useEffect } from 'react'

import { theme } from '../../../common/theme'
import SaleWhiteIcon from '../../../assets/icons/sale-white.svg'
import ServiceWhiteIcon from '../../../assets/icons/service-white.svg'
import VacancyWhiteIcon from '../../../assets/icons/vacancy-white.svg'

import { SelectIncomeTypeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
/* import { CultureType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext' */

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectIncomeType({ route, navigation }: SelectIncomeTypeScreenProps) {
	/* const { isSecondPost, setCultureDataOnContext, getAditionalDataFromLastPost } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext) */

	useEffect(() => {
		/* if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		} */
	}, [])

	/* const saveWorkplaceType = (cultureType: CultureType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ cultureType })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ cultureType })
		navigation.navigate('SelectCultureCategory')
	} */

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
				onPress={() => navigation.navigate('SaleStack')}
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
				onPress={() => navigation.navigate('ServiceStack')}
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
				onPress={() => navigation.navigate('VacancyStack')}
			/>
		</PostSelectButton>
	)
}

export { SelectIncomeType }
