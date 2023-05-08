import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import PersonWithSuitCaseIcon from '../../../assets/icons/personWithSuitCase-white.svg'
import SuitCaseIcon from '../../../assets/icons/suitCase-white.svg'

import { relativeScreenHeight } from '../../../common/screenDimensions'

import { SelectVacancyPurposeScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { VacancyPurpose } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

function SelectVacancyPurpose({ route, navigation }: SelectVacancyPurposeScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

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
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'você está \nprocurando uma vaga \nou está \nprocurando um profissional?'}
					highlightedWords={['uma', 'vaga', 'um', 'profissional']}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.yellow2}
			>
				<ButtonsContainer>
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
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectVacancyPurpose }
