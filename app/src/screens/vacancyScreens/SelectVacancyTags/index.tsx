import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import {
	Container,
	ContainerBottom,
	FloatButtonContainer,
	InputTagArea,
	Sigh,
	TagsSelectedArea,
	TagsUnselectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import Check from '../../../assets/icons/check.svg'

import { vacancyCategories, updateVacancyTags } from '../vacancyCategories'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { SelectVacancyTagsScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function SelectVacancyTags({ route, navigation }: SelectVacancyTagsScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const [textTag, setTextTag] = useState('')
	const [keyboardOpened, setKeyboardOpened] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const tagsSelectedRef = useRef() as any

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const renderSelectedTags = () => selectedTags.map((tagName) => (
		<SelectButton
			key={uuid()}
			width={screenWidth * 0.24}
			height={screenHeight * 0.07}
			label={tagName}
			boldLabel
			fontSize={12}
			marginHorizontal={6}
			backgroundSelected={theme.yellow1}
			selected
			onSelect={() => onSelectTag(tagName)}
		/>
	))

	const renderUnselectedTags = () => {
		const ordenedVacancyTags = vacancyCategories[getVacancyCategorySelected()].tags.sort(sortVacancyTags)

		return ordenedVacancyTags.map((tagName, index) => {
			if (selectedTags.includes(tagName)) return
			if (tagName.indexOf(textTag.toLowerCase()) !== -1 && !selectedTags.includes(tagName)) {
				return (
					<SelectButton
						key={uuid()}
						width={screenWidth * 0.38}
						height={screenHeight * 0.1}
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

	const sortVacancyTags = (a: string, b: string) => {
		if (a < b) return -1
		if (a > b) return 1
		return 0
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

	const scrollToEnd = () => {
		tagsSelectedRef.current.scrollToEnd({
			animated: true
		})
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
		setVacancyDataOnContext({
			tags: selectedTags
		})
		navigation.navigate('SelectVacancyType')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={screenHeight * 0.30}
				relativeHeight={'30%'}
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
							!keyboardOpened
							&& (
								<TagsSelectedArea>
									<ScrollView
										ref={tagsSelectedRef}
										onContentSizeChange={scrollToEnd}
										horizontal
										showsHorizontalScrollIndicator={false}
										scrollsToTop
									>
										{renderSelectedTags()}
									</ScrollView>
								</TagsSelectedArea>
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
