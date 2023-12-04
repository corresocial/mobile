import React, { useContext, useEffect } from 'react'

import { EditContext } from '@contexts/EditContext'
import { VacancyContext } from '@contexts/VacancyContext'

import PersonWithSuitCaseIcon from '../../../assets/icons/personWithSuitCase-white.svg'
import SuitCaseIcon from '../../../assets/icons/suitCase-white.svg'
import { theme } from '../../../common/theme'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { SelectVacancyPurposeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

function SelectVacancyPurpose({ route, navigation }: SelectVacancyPurposeScreenProps) {
	const { isSecondPost, setVacancyDataOnContext, getAditionalDataFromLastPost } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const saveVacancyPurpose = (lookingFor: boolean) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ lookingFor })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ lookingFor })

		navigation.navigate('SelectVacancyCategory')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'você está \nprocurando uma vaga \nou um profissional?'}
			highlightedWords={['vaga', 'profissional']}
			headerBackgroundColor={theme.green2}
			backgroundColor={theme.white3}
			progress={[1, isSecondPost ? 6 : 7]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando \nprofissional'}
				highlightedWords={['\nprofissional']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={SuitCaseIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveVacancyPurpose(false)}
			/>
			<OptionButton
				label={'procurando \nvaga'}
				highlightedWords={['\nvaga']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={PersonWithSuitCaseIcon}
				svgIconScale={['45%', '45%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveVacancyPurpose(true)}
			/>
		</PostSelectButton>
	)
}

export { SelectVacancyPurpose }
