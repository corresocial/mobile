import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import uuid from 'react-uuid'

import {
	Container,
	ContainerBottom,
	FloatButtonContainer,
	InputTagArea,
	Sigh,
	TagsUnselectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import CheckIcon from '../../../assets/icons/check-white.svg'

import { sortArray } from '../../../common/auxiliaryFunctions'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { SelectedTagsHorizontalList } from '../../../components/SelectedTagsHorizontalList'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { MacroCategory } from '../../../services/firebase/types'

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
			setTextTag('')
			return onSelectTag(lowerCaseTag)
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

	const categoryLabelSelectedIsLarge = () => getCurrentCategoryLabelHightlighted().length > 1

	return (
		<Container>
			<DefaultHeaderContainer
				minHeight={categoryLabelSelectedIsLarge() ? relativeScreenHeight(24) : relativeScreenHeight(18)}
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
					<LineInput
						value={textTag}
						relativeWidth={'100%'}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={lightColor}
						validBorderBottomColor={theme.black4}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						lastInput
						fontSize={16}
						blurOnSubmit
						invalidTextAfterSubmit={false}
						placeholder={'digite ou escolha alguma das opções'}
						keyboardType={'default'}
						textIsValid={currentCategory.tags.includes(textTag as never)}
						textInputRef={null}
						onPressKeyboardSubmit={saveNewTag}
						onChangeText={(text: string) => setTextTag(text)}
					/>
				</InputTagArea>
				{
					!!selectedTags.length
					&& (
						< SelectedTagsHorizontalList
							backgroundSelected={lightColor}
							selectedTags={selectedTags}
							onSelectTag={onSelectTag}
						/>
					)
				}
				<SelectButtonsContainer
					backgroundColor={theme.white2}
				>
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

						<Sigh />
					</ScrollView>
				</SelectButtonsContainer>
				{
					selectedTags.length
						? (
							<FloatButtonContainer>
								<PrimaryButton
									flexDirection={'row-reverse'}
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SvgIcon={CheckIcon}
									svgIconScale={['40%', '25%']}
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
