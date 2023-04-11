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

import { socialImpactCategories, updateSocialImpactTags } from '../../../utils/postsCategories/socialImpactCategories'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { sortArray } from '../../../common/auxiliaryFunctions'

import { SelectSocialImpactTagsScreenProps } from '../../../routes/Stack/socialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { SelectedTagsHorizontalList } from '../../../components/SelectedTagsHorizontalList'

function SelectSocialImpactTags({ route, navigation }: SelectSocialImpactTagsScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
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
		const ordenedSocialImpactTags = socialImpactCategories[getSocialImpactCategorySelected()].tags.sort(sortArray)

		return ordenedSocialImpactTags.map((tagName, index) => {
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
						backgroundSelected={theme.pink1}
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

	const getSocialImpactCategorySelected = () => {
		const { categorySelected } = route.params
		return categorySelected
	}

	const getCurrentCategoryLabelHightlighted = () => {
		const highlightedWords = socialImpactCategories[getSocialImpactCategorySelected()].label.split(' ')
		return highlightedWords
	}

	const getCurrentCategoryLabel = () => socialImpactCategories[getSocialImpactCategorySelected()].label

	const categoryLabelSelectedIsLarge = () => getCurrentCategoryLabelHightlighted().length > 1

	const addNewTag = () => {
		const lowerCaseTag = textTag.toLowerCase()

		if (!lowerCaseTag.length) return
		if (socialImpactCategories[getSocialImpactCategorySelected()].tags.includes(lowerCaseTag as never)) {
			setTextTag('')
			return onSelectTag(lowerCaseTag)
		}
		const selectedCategoriesCurrent = [...selectedTags]
		selectedCategoriesCurrent.push(lowerCaseTag)

		setSelectedTags(selectedCategoriesCurrent)
		updateSocialImpactTags(getSocialImpactCategorySelected(), lowerCaseTag)
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

		setSocialImpactDataOnContext({ tags: selectedTags })
		navigation.navigate('InsertSocialImpactTitle')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={categoryLabelSelectedIsLarge() ? relativeScreenHeight(25) : relativeScreenHeight(20)}
				relativeHeight={categoryLabelSelectedIsLarge() ? '30%' : '24%'}
				centralized
				backgroundColor={theme.pink2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={getCurrentCategoryLabel()}
					titleFontSize={26}
					description={'quais palavras tem a ver com esse post?'}
					highlightedWords={[...getCurrentCategoryLabelHightlighted(), 'palavras', 'tem', 'a', 'ver']}
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
						validBackgroundColor={theme.pink1}
						validBorderBottomColor={theme.pink5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						textAlign={'left'}
						lastInput
						blurOnSubmit
						fontSize={16}
						invalidTextAfterSubmit={false}
						placeholder={'digite ou escolha alguma das opções'}
						keyboardType={'default'}
						textIsValid={socialImpactCategories[getSocialImpactCategorySelected()].tags.includes(textTag as never)}
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
									backgroundSelected={theme.pink1}
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

export { SelectSocialImpactTags }
