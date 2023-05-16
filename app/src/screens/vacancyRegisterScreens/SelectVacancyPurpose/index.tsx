import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import PersonWithSuitCaseIcon from '../../../assets/icons/personWithSuitCase-white.svg'
import SuitCaseIcon from '../../../assets/icons/suitCase-white.svg'

import { SelectVacancyPurposeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { VacancyPurpose } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'

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
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'25%'}
				labelColor={theme.black4}
				fontSize={16}
				SecondSvgIcon={PersonWithSuitCaseIcon}
				label={'procurando \numa vaga'}
				highlightedWords={['\numa', 'vaga']}
				onPress={() => saveWorkplaceType('findVacancy')}
			/>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'25%'}
				labelColor={theme.black4}
				fontSize={16}
				SecondSvgIcon={SuitCaseIcon}
				label={'procurando \num profissional'}
				highlightedWords={['\num', 'profissional']}
				onPress={() => saveWorkplaceType('findProffessional')}
			/>
		</PostSelectButton>
	)
}

export { SelectVacancyPurpose }
