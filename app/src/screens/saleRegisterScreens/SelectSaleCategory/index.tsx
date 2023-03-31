import React, { useContext } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { theme } from '@common/theme'
import { relativeScreenHeight } from '@common/screenDimensions'

import { saleCategories } from '@utils/postsCategories/saleCategories'
import { sortPostCategories } from '@common/auxiliaryFunctions'

import { SaleCategories } from '@services/firebase/types'
import { SelectSaleCategoryScreenProps } from '@routes/Stack/SaleStack/stackScreenProps'

import { SaleContext } from '@contexts/SaleContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '@components/_containers/SelectButtonsContainer'
import { SelectButton } from '@components/_buttons/SelectButton'
import { BackButton } from '@components/_buttons/BackButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { ProgressBar } from '@components/ProgressBar'
import { Container } from './styles'

function SelectSaleCategory({
	route,
	navigation,
}: SelectSaleCategoryScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)

	const renderSelectOptionsButtons = () => {
		const ordenedSaleCategories =			Object.values(saleCategories).sort(sortPostCategories)

		return ordenedSaleCategories.map((category, index) => {
			if (category.label === 'outros') return
			return (
				<SelectButton
					key={uuid()}
					width={'45%'}
					height={relativeScreenHeight(11)}
					label={category.label}
					boldLabel
					onSelect={() => onSelectCategory(category.value as SaleCategories)}
				/>
			)
		})
	}

	const onSelectCategory = (categoryName: SaleCategories) => {
		setSaleDataOnContext({ category: categoryName })
		navigation.navigate('SelectSaleTags', {
			categorySelected: categoryName,
			...route.params,
		})
	}

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'em qual categoria seu item se encaixa?'}
					highlightedWords={['categoria', 'seu', 'item']}
				>
					<ProgressBar range={5} value={1} />
				</InstructionCard>
			</DefaultHeaderContainer>
			<ScrollView>
				<SelectButtonsContainer backgroundColor={theme.green2}>
					{renderSelectOptionsButtons() as any}
					<SelectButton
						key={'others'}
						width={'100%'}
						height={relativeScreenHeight(11)}
						label={'outros'}
						boldLabel
						onSelect={() => onSelectCategory('others' as SaleCategories)}
					/>
				</SelectButtonsContainer>
			</ScrollView>
		</Container>
	)
}

export { SelectSaleCategory }
