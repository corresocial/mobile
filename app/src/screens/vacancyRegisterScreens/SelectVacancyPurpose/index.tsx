import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import PersonWithSuitCaseIcon from '../../../assets/icons/personWithSuitCase-white.svg'
import SuitCaseIcon from '../../../assets/icons/suitCase-white.svg'

import { SelectVacancyPurposeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { VacancyPurpose } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectVacancyPurpose({ route, navigation }: SelectVacancyPurposeScreenProps) {
	const { setVacancyDataOnContext, getAditionalDataFromLastPost } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const saveWorkplaceType = (vacancyPurpose: VacancyPurpose) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ vacancyPurpose })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ vacancyPurpose })

		navigation.navigate('SelectVacancyCategory')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'você está \nprocurando uma vaga \nou um profissional?'}
			highlightedWords={['vaga', 'profissional']}
			headerBackgroundColor={theme.yellow2}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando \nprofissional'}
				highlightedWords={['\nprofissional']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={SuitCaseIcon}
				svgIconScale={['55%', '55%']}
				leftSideColor={theme.yellow3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('findProffessional')}
			/>
			<OptionButton
				label={'procurando \nvaga'}
				highlightedWords={['\nvaga']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={PersonWithSuitCaseIcon}
				svgIconScale={['55%', '55%']}
				leftSideColor={theme.yellow3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('findVacancy')}
			/>

		</PostSelectButton>
	)
}

export { SelectVacancyPurpose }
