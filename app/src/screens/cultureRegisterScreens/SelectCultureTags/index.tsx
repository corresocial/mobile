import React, { useContext, useEffect, useRef, useState } from 'react'
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
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { cultureCategories, updateCultureTags } from '../../../utils/postsCategories/cultureCategories'
import { sortArray } from '../../../common/auxiliaryFunctions'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { SelectCultureTagsScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { SelectedTagsHorizontalList } from '../../../components/SelectedTagsHorizontalList'

function SelectCultureTags({ route, navigation }: SelectCultureTagsScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [textTag, setTextTag] = useState('')
	const [keyboardOpened, setKeyboardOpened] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const inputNewTagRef = useRef() as any

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const renderUnselectedTags = () => {
		const ordenedCultureTags = cultureCategories[getCultureCategorySelected()].tags.sort(sortArray)

		return ordenedCultureTags.map((tagName, index) => {
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
						backgroundSelected={theme.blue1}
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

	const getCultureCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const getCurrentCategoryLabelHightlighted = () => {
		const highlightedWords = cultureCategories[getCultureCategorySelected()].label.split(' ')
		return highlightedWords
	}

	const getCurrentCategoryLabel = () => cultureCategories[getCultureCategorySelected()].label

	const categoryLabelSelectedIsLarge = () => getCurrentCategoryLabelHightlighted().length > 3

	const addNewTag = () => {
		const lowerCaseTag = textTag.toLowerCase()

		if (!lowerCaseTag.length) return
		if (cultureCategories[getCultureCategorySelected()].tags.includes(lowerCaseTag as never)) {
			setTextTag('')
			return onSelectTag(lowerCaseTag)
		}
		const selectedCategoriesCurrent = [...selectedTags]
		selectedCategoriesCurrent.push(lowerCaseTag)

		setSelectedTags(selectedCategoriesCurrent)
		updateCultureTags(getCultureCategorySelected(), lowerCaseTag)
		setTextTag('')
	}

	const saveTags = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ tags: selectedTags })
			navigation.goBack()
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ tags: selectedTags })
		if (cultureDataContext.cultureType === 'eventPost') {
			navigation.navigate('InsertEntryValue')
		} else {
			navigation.navigate('SelectExhibitionPlace')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={categoryLabelSelectedIsLarge() ? relativeScreenHeight(25) : relativeScreenHeight(20)}
				relativeHeight={categoryLabelSelectedIsLarge() ? '30%' : '24%'}
				centralized
				backgroundColor={theme.blue2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={getCurrentCategoryLabel()}
					titleFontSize={26}
					description={`que tipo de ${getCurrentCategoryLabel()} você quer anunciar?`}
					highlightedWords={[...getCurrentCategoryLabelHightlighted()]}
					height={'100%'}
					color={theme.white3}
				/>
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
						textInputRef={inputNewTagRef}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						lastInput
						blurOnSubmit
						fontSize={16}
						invalidTextAfterSubmit={false}
						placeholder={'digite ou escolha alguma das opções'}
						keyboardType={'default'}
						textIsValid={cultureCategories[getCultureCategorySelected()].tags.includes(textTag as never)}
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
								< SelectedTagsHorizontalList
									backgroundSelected={theme.blue1}
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
								SvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={saveTags}
							/>
						</FloatButtonContainer>
					)
				}
			</ContainerBottom>
		</Container >
	)
}

export { SelectCultureTags }
