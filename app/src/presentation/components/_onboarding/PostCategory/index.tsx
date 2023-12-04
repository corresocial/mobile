import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'

import { PostCategoriesObject, PostCategoriesType } from '../../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../_containers/SelectButtonsContainer'
import { SelectButton } from '../../_buttons/SelectButton'
import { BackButton } from '../../_buttons/BackButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { ProgressBar } from '../../ProgressBar'
import { VerticalSpacing } from '../../_space/VerticalSpacing'
import { UiPostUtils } from '../../../utils-ui/post/UiPostUtils'

const { sortPostCategories } = UiPostUtils()

interface PostCategoryProps {
	backgroundColor: string
	progress: [value: number, range: number]
	categories: PostCategoriesObject
	savePostCategory: (categoryName: PostCategoriesType) => void
	navigateBackwards: () => void
}

function PostCategory({ backgroundColor, progress, categories, savePostCategory, navigateBackwards }: PostCategoryProps) {
	const renderSelectOptionsButtons = () => {
		const ordenedSaleCategories = Object.values(categories).sort(sortPostCategories)

		return ordenedSaleCategories.map((category) => {
			if (category.label === 'outros') return
			return (
				<SelectButton
					key={uuid()}
					width={'45%'}
					height={relativeScreenHeight(11)}
					label={category.label}
					boldLabel
					onSelect={() => savePostCategory(category.value as PostCategoriesType)}
				/>
			)
		})
	}

	const categoriesAreOdd = () => {
		return Object.keys(categories).length % 2 === 0
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'a qual categoria pertence?'}
					highlightedWords={['categoria', 'seu', 'post']}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ScrollView style={{ backgroundColor }}>
				<SelectButtonsContainer
					backgroundColor={backgroundColor}
				>
					{renderSelectOptionsButtons() as any}
					< SelectButton
						key={'others'}
						width={categoriesAreOdd() ? '45%' : '100%'}
						height={relativeScreenHeight(11)}
						label={'outros'}
						boldLabel
						onSelect={() => savePostCategory('others')}
					/>
				</SelectButtonsContainer>
				<VerticalSpacing height={relativeScreenHeight(4)} />
			</ScrollView>
		</Container>
	)
}

export { PostCategory }
