import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, ScrollView, StatusBar } from 'react-native'
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
import Check from '../../../assets/icons/check.svg'

import { vacancyCategories, updateVacancyTags } from '../vacancyCategories'
import { sortArray } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { SelectVacancyTagsScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'
import { SelectedTagsHorizontalList } from '../../../components/SelectedTagsHorizontalList'

function SelectVacancyTags({ route, navigation }: SelectVacancyTagsScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [textTag, setTextTag] = useState('')
	const [keyboardOpened, setKeyboardOpened] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const renderUnselectedTags = () => {
		const ordenedVacancyTags = vacancyCategories[getVacancyCategorySelected()].tags.sort(sortArray)

		return ordenedVacancyTags.map((tagName, index) => {
			if (selectedTags.includes(tagName)) return
			if (tagName.indexOf(textTag.toLowerCase()) !== -1 && !selectedTags.includes(tagName)) {
				return (
					<SelectButton
						key={uuid()}
						width={relativeScreenWidth(38)}
						height={relativeScreenHeight(10)}
						label={tagName}
						fontSize={15}
						boldLabel
						backgroundSelected={theme.yellow1}
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

	const getVacancyCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const getCurrentCategoryLabelHightlighted = () => {
		const highlightedWords = vacancyCategories[getVacancyCategorySelected()].label.split(' ')
		highlightedWords[highlightedWords.length - 1] = `${highlightedWords[highlightedWords.length - 1]}`
		return highlightedWords
	}

	const getCurrentCategoryLabel = () => vacancyCategories[getVacancyCategorySelected()].label

	const addNewTag = () => {
		const lowerCaseTag = textTag.toLowerCase()

		if (!lowerCaseTag.length) return
		if (vacancyCategories[getVacancyCategorySelected()].tags.includes(lowerCaseTag as never)) {
			setTextTag('')
			return onSelectTag(lowerCaseTag)
		}
		const selectedCategoriesCurrent = [...selectedTags]
		selectedCategoriesCurrent.push(lowerCaseTag)

		setSelectedTags(selectedCategoriesCurrent)
		updateVacancyTags(getVacancyCategorySelected(), lowerCaseTag)
		setTextTag('')
	}

	const saveTags = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				category: route.params.categorySelected,
				tags: selectedTags
			})
			navigation.goBack()
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({
			tags: selectedTags
		})
		navigation.navigate('SelectVacancyType')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(25)}
				relativeHeight={'25%'}
				centralized
				backgroundColor={theme.yellow2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={`dentro de ${getCurrentCategoryLabel()}, quais palavras tem a ver com a vaga?`}
					highlightedWords={[...getCurrentCategoryLabelHightlighted(), 'tem', 'a', 'ver']}
				>
					<ProgressBar
						range={5}
						value={4}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ContainerBottom
				style={{
					justifyContent: keyboardOpened ? 'center' : 'flex-start'
				}}
			>
				<InputTagArea >
					<LineInput
						value={textTag}
						relativeWidth={'100%'}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.yellow1}
						validBorderBottomColor={theme.yellow5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						lastInput
						fontSize={16}
						blurOnSubmit={false}
						invalidTextAfterSubmit={false}
						placeholder={'digite ou escolha alguma das opções'}
						keyboardType={'default'}
						textIsValid={vacancyCategories[getVacancyCategorySelected()].tags.includes(textTag as never)}
						onPressKeyboardSubmit={addNewTag}
						onChangeText={(text: string) => setTextTag(text)}
					/>
				</InputTagArea>
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
						{
							!keyboardOpened && !!selectedTags.length
							&& (
								< SelectedTagsHorizontalList
									backgroundSelected={theme.yellow1}
									selectedTags={selectedTags}
									onSelectTag={onSelectTag}
								/>
							)
						}
						<TagsUnselectedArea>
							{renderUnselectedTags()}
						</TagsUnselectedArea>

						<Sigh />
					</ScrollView>
				</SelectButtonsContainer>
				{
					!!selectedTags.length && !keyboardOpened
					&& (
						<FloatButtonContainer>
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveTags}
							/>
						</FloatButtonContainer>
					)
				}
			</ContainerBottom>
		</Container >
	)
}

export { SelectVacancyTags }
