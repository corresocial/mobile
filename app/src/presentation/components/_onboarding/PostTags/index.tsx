import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import uuid from 'react-uuid'

import { MacroCategory } from '@services/firebase/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import {
	Container,
	ContainerBottom,
	FloatButtonContainer,
	InputTagArea,
	TagsUnselectedArea
} from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectButton } from '@components/_buttons/SelectButton'
import { InfoCard } from '@components/_cards/InfoCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '@components/_containers/SelectButtonsContainer'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SelectedTagsHorizontalList } from '../../SelectedTagsHorizontalList'

const { sortArray } = UiUtils()

interface PostTagsProps {
	backgroundColor: string
	lightColor: string
	currentCategory: MacroCategory
	addNewTag: (tagName: string) => void
	savePostTags: (tags: string[]) => void
	navigateBackwards: () => void
}

function PostTags({ backgroundColor, lightColor, currentCategory, addNewTag, savePostTags, navigateBackwards }: PostTagsProps) {
	const [textTag, setTextTag] = useState('')
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const renderUnselectedTags = () => {
		const ordenedServiceTags = currentCategory.tags.sort(sortArray)

		return ordenedServiceTags.map((tagName: string) => {
			if (selectedTags.includes(tagName)) return
			if (tagName.indexOf(textTag.toLowerCase()) !== -1 && !selectedTags.includes(tagName)) {
				return (
					<SelectButton
						key={uuid()}
						width={relativeScreenWidth(38)}
						height={relativeScreenHeight(8.6)}
						label={tagName}
						fontSize={14}
						boldLabel
						backgroundSelected={lightColor}
						onSelect={() => onSelectTag(tagName)}
					/>
				)
			}
			return null
		})
	}

	const onSelectTag = (tagName: string) => {
		const selectedCategoriesCurrent = [...selectedTags]
		if (selectedTags.includes(tagName)) {
			const selectedTagsFiltred = selectedCategoriesCurrent.filter((tag) => tag !== tagName)
			setSelectedTags(selectedTagsFiltred)
		} else {
			selectedCategoriesCurrent.push(tagName)
			setSelectedTags(selectedCategoriesCurrent)
		}
	}

	const saveNewTag = () => {
		const lowerCaseTag = textTag.toLowerCase()

		if (!lowerCaseTag.length) return
		if (currentCategory.tags.includes(lowerCaseTag as never)) {
			onSelectTag(lowerCaseTag)
			setTextTag('')
			return
		}

		const currentTagsSelected = [...selectedTags]
		currentTagsSelected.push(lowerCaseTag)
		setSelectedTags(currentTagsSelected)
		addNewTag(lowerCaseTag)
		setTextTag('')
	}

	const getCurrentCategoryLabelHightlighted = () => {
		const highlightedWords = currentCategory.label.split(' ')
		return highlightedWords
	}

	const getCurrentCategoryLabel = () => currentCategory.label

	const categoryLabelSelectedIsLarge = () => getCurrentCategoryLabelHightlighted().length > 1 || getCurrentCategoryLabel().length > 14

	const textAlreadyATag = (text: string) => {
		return selectedTags.includes(text.toLowerCase()) || currentCategory.tags.includes(text.toLowerCase())
	}

	return (
		<Container>
			<DefaultHeaderContainer
				minHeight={categoryLabelSelectedIsLarge() ? relativeScreenHeight(26) : relativeScreenHeight(22)}
				centralized
				grow
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InfoCard
					title={getCurrentCategoryLabel()}
					titleFontSize={26}
					description={`que tipo de ${getCurrentCategoryLabel()} você quer anunciar?`}
					highlightedWords={[...getCurrentCategoryLabelHightlighted()]}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<ContainerBottom>
				<InputTagArea >
					<SearchInput
						value={textTag}
						validBackgroundColor={lightColor}
						validateText={textAlreadyATag}
						autoCapitalize={'none'}
						onChangeText={(text: string) => setTextTag(text)}
						onPressKeyboardSubmit={saveNewTag}
					/>
				</InputTagArea>
				{
					!!selectedTags.length
					&& (
						<SelectedTagsHorizontalList
							backgroundSelected={lightColor}
							selectedTags={selectedTags}
							onSelectTag={onSelectTag}
						/>
					)
				}
				<SelectButtonsContainer backgroundColor={theme.white3}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={{
							height: '100%', flex: 1
						}}
						contentContainerStyle={{
							flexDirection: 'row',
							flexWrap: 'wrap',
							overflow: 'scroll',
						}}
					>

						<TagsUnselectedArea>
							{renderUnselectedTags()}
						</TagsUnselectedArea>

						<VerticalSpacing height={relativeScreenHeight(10)} />
					</ScrollView>
				</SelectButtonsContainer>
				{
					selectedTags.length
						? (
							<FloatButtonContainer>
								<PrimaryButton
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SecondSvgIcon={CheckIcon}
									onPress={() => savePostTags(selectedTags)}
								/>
							</FloatButtonContainer>
						)
						: null
				}
			</ContainerBottom>
		</Container >
	)
}

export { PostTags }
