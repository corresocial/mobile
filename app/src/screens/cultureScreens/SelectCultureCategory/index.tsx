import React, { useContext } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { Container } from './styles'
import { screenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'

import { cultureCategories } from '../cultureCategories'

import { SelectCultureCategoryScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureCategories, MacroCategory } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectCultureCategory({ navigation }: SelectCultureCategoryScreenProps) {
	const { cultureDataContext } = useContext(CultureContext)

	const renderSelectOptionsButtons = () => {
		const ordenedCultureCategories = Object.values(cultureCategories).sort(sortCultureCategories)

		return ordenedCultureCategories.map((category, index) => {
			if (category.label === 'outros') return
			return (
				<SelectButton
					key={uuid()}
					width={'45%'}
					height={screenHeight * 0.11}
					label={category.label}
					boldLabel
					onSelect={() => onSelectCategory(category.value as CultureCategories)}
				/>
			)
		})
	}

	const sortCultureCategories = (a: MacroCategory, b: MacroCategory) => {
		if (a.label < b.label) return -1
		if (a.label > b.label) return 1
		return 0
	}

	const onSelectCategory = (categoryName: CultureCategories) => {
		navigation.navigate('SelectCultureTags', {
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
					message={
						cultureDataContext.cultureType === 'artistProfile'
							? 'em qual categoria sua arte se encaixa?'
							: 'em qual categoria seu role se encaixa?'
					}
					highlightedWords={
						cultureDataContext.cultureType === 'artistProfile'
							? ['categoria', 'sua', 'arte']
							: ['categoria', 'seu', 'role']
					}
				>
					<ProgressBar
						range={cultureDataContext.cultureType === 'artistProfile' ? 3 : 5}
						value={2}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ScrollView style={{
				backgroundColor: theme.blue2
			}}
			>
				<SelectButtonsContainer
					backgroundColor={theme.blue2}
				>
					{renderSelectOptionsButtons() as any}
					<SelectButton
						key={'others'}
						width={'100%'}
						height={screenHeight * 0.11}
						label={'outros'}
						boldLabel
						onSelect={() => onSelectCategory('others' as CultureCategories)}
					/>
				</SelectButtonsContainer>
			</ScrollView>
		</Container>
	)
}

export { SelectCultureCategory }
