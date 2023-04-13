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
import CheckIcon from '../../../assets/icons/check-white.svg'

import { serviceCategories, updateServiceTags } from '../../../utils/postsCategories/serviceCategories'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { sortArray } from '../../../common/auxiliaryFunctions'

import { SelectServiceTagsScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { SelectedTagsHorizontalList } from '../../../components/SelectedTagsHorizontalList'
import { InfoCard } from '../../../components/_cards/InfoCard'

function SelectServiceTags({ route, navigation }: SelectServiceTagsScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
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
		const ordenedServiceTags = serviceCategories[getServiceCategorySelected()].tags.sort(sortArray)

		return ordenedServiceTags.map((tagName) => {
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
						backgroundSelected={theme.purple1}
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

	const getServiceCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const getCurrentCategoryLabelHightlighted = () => {
		const highlightedWords = serviceCategories[getServiceCategorySelected()].label.split(' ')
		return highlightedWords
	}

	const getCurrentCategoryLabel = () => serviceCategories[getServiceCategorySelected()].label

	const categoryLabelSelectedIsLarge = () => getCurrentCategoryLabelHightlighted().length > 1

	const addNewTag = () => {
		const lowerCaseTag = textTag.toLowerCase()

		if (!lowerCaseTag.length) return
		if (serviceCategories[getServiceCategorySelected()].tags.includes(lowerCaseTag as never)) {
			setTextTag('')
			return onSelectTag(lowerCaseTag)
		}
		const selectedCategoriesCurrent = [...selectedTags]
		selectedCategoriesCurrent.push(lowerCaseTag)

		setSelectedTags(selectedCategoriesCurrent)
		updateServiceTags(getServiceCategorySelected(), lowerCaseTag)
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

		setServiceDataOnContext({
			tags: selectedTags
		})
		navigation.navigate('InsertServiceName')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={categoryLabelSelectedIsLarge() ? relativeScreenHeight(24) : relativeScreenHeight(18)}
				centralized
				grow
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={getCurrentCategoryLabel()}
					titleFontSize={26}
					description={`que tipo de ${getCurrentCategoryLabel()} você quer anunciar?`}
					highlightedWords={[...getCurrentCategoryLabelHightlighted()]}
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
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.purple1}
						validBorderBottomColor={theme.purple5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						lastInput
						fontSize={16}
						blurOnSubmit
						invalidTextAfterSubmit={false}
						placeholder={'digite ou escolha alguma das opções'}
						keyboardType={'default'}
						textIsValid={serviceCategories[getServiceCategorySelected()].tags.includes(textTag as never)}
						onPressKeyboardSubmit={addNewTag}
						onChangeText={(text: string) => setTextTag(text)}
					/>
				</InputTagArea>
				{
					!keyboardOpened && !!selectedTags.length
					&& (
						< SelectedTagsHorizontalList
							backgroundSelected={theme.purple1}
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
					!!selectedTags.length && !keyboardOpened
						? (
							<FloatButtonContainer>
								<PrimaryButton
									flexDirection={'row-reverse'}
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SvgIcon={CheckIcon}
									svgIconScale={['40%', '25%']}
									onPress={saveTags}
								/>
							</FloatButtonContainer>
						)
						: null
				}
			</ContainerBottom>
		</Container >
	)
}

export { SelectServiceTags }
