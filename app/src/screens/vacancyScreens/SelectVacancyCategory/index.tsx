import React, { useContext } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'

import { vacancyCategories } from '../vacancyCategories'

import { SelectVacancyCategoryScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { VacancyCategories, MacroCategory } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectVacancyCategory({ navigation }: SelectVacancyCategoryScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const renderSelectOptionsButtons = () => {
		const ordenedVacancysCategories = Object.values(vacancyCategories).sort(sortVacancyCategories)

		return ordenedVacancysCategories.map((category, index) => {
			if (category.label === 'outros') return
			return (
				<SelectButton
					key={uuid()}
					width={'45%'}
					height={screenHeight * 0.11}
					label={category.label}
					boldLabel
					onSelect={() => onSelectCategory(category.value as VacancyCategories)}
				/>
			)
		})
	}

	const sortVacancyCategories = (a: MacroCategory, b: MacroCategory) => {
		if (a.label < b.label) return -1
		if (a.label > b.label) return 1
		return 0
	}

	const onSelectCategory = (categoryName: VacancyCategories) => {
		setVacancyDataOnContext({
			category: categoryName
		})
		navigation.navigate('SelectVacancyTags', {
			categorySelected: categoryName
		})
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'em qual categoria essa vaga se encaixa?'}
					highlightedWords={['categoria', 'essa', 'vaga']}
				>
					<ProgressBar
						range={5}
						value={4}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ScrollView>
				<SelectButtonsContainer
					backgroundColor={theme.yellow2}
				>
					{renderSelectOptionsButtons() as any}
					<SelectButton
						key={'others'}
						width={'100%'}
						height={screenHeight * 0.11}
						label={'outros'}
						boldLabel
						onSelect={() => onSelectCategory('others' as VacancyCategories)}
					/>
				</SelectButtonsContainer>
			</ScrollView>
		</Container>
	)
}

export { SelectVacancyCategory }
