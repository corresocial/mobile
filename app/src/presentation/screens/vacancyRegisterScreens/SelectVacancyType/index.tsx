import React, { useContext } from 'react'

import { VacancyType } from '@domain/post/entity/types'

import { EditContext } from '@contexts/EditContext'
import { useIncomeContext } from '@contexts/IncomeContext'

import { SelectVacancyTypeScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import ClockWhiteIcon from '@assets/icons/clock-white.svg'
import SuitCaseWhiteIcon from '@assets/icons/suitCase-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectVacancyType({ route, navigation }: SelectVacancyTypeScreenProps) {
	const { isSecondPost, setIncomeDataOnContext } = useIncomeContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveVacancyType = (vacancyType: VacancyType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ vacancyType })
			navigation.goBack()
			return
		}

		setIncomeDataOnContext({ vacancyType })
		navigation.navigate('SelectIncomeRange')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'que tipo de vaga?'}
			highlightedWords={['tipo', 'vaga']}
			headerBackgroundColor={theme.colors.green[2]}
			backgroundColor={theme.colors.white[3]}
			progress={[5, isSecondPost ? 6 : 7]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'vaga \nprofissional'}
				highlightedWords={['\nprofissional']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={SuitCaseWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.colors.green[3]}
				leftSideWidth={'25%'}
				onPress={() => saveVacancyType('professional')}
			/>
			<OptionButton
				label={'vaga \ntemporária'}
				highlightedWords={['\ntemporária']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ClockWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.colors.green[3]}
				leftSideWidth={'25%'}
				onPress={() => saveVacancyType('temporary')}
			/>
			<OptionButton
				label={'um \nbico'}
				highlightedWords={['\nbico']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ChatWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.colors.green[3]}
				leftSideWidth={'25%'}
				onPress={() => saveVacancyType('beak')}
			/>
		</PostSelectButton>
	)
}

export { SelectVacancyType }
