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
			title={'você está \nprocurando uma vaga \nou está \nprocurando um profissional?'}
			highlightedWords={['uma', 'vaga', 'um', 'profissional']}
			backgroundColor={theme.yellow2}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando \numa vaga'}
				highlightedWords={['\numa', 'vaga']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={PersonWithSuitCaseIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.yellow3}
				leftSideWidth={'22%'}
				onPress={() => saveWorkplaceType('findVacancy')}
			/>
			<OptionButton
				label={'procurando \num profissional'}
				highlightedWords={['\num', 'profissional']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={SuitCaseIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.yellow3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('findProffessional')}
			/>
		</PostSelectButton>
	)
}

export { SelectVacancyPurpose }
