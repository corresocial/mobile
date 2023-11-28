import { Platform, StatusBar, TextInput } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import uuid from 'react-uuid'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import TrashWhiteIcon from '../../../assets/icons/trash-white.svg'

import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { DefaultInput } from '../../../components/_inputs/DefaultInput'
import { HorizontalSpacing } from '../../../components/_space/HorizontalSpacing'
import { SmallButton } from '../../../components/_buttons/SmallButton'

interface PostLinksProps {
	initialValue?: string[]
	keyboardOpened: boolean
	editMode?: boolean
	navigateBackwards: () => void
	saveLinks: (links: string[]) => void
}

function PostLinks({ keyboardOpened, initialValue, editMode, navigateBackwards, saveLinks }: PostLinksProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [linkText, setLinkText] = useState('')
	const [linksList, setLinksList] = useState<string[]>(initialValue || [])

	const inputRefs = {
		inputCards: [
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null)
		],
		linkTextInput: useRef<TextInput>(null),
	}

	const validateVacancyLinks = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const moveToEditableInput = (text: string) => {
		setLinkText(text)
	}

	const renderPostLinksSaved = () => {
		if (!linksLength() || keyboardOpened) return null
		return linksList.map((currentLink, index) => (
			<DefaultInput
				key={uuid()}
				value={currentLink}
				relativeWidth={'100%'}
				textInputRef={inputRefs.inputCards[index]}
				defaultBackgroundColor={theme.white2}
				validBackgroundColor={theme.green1}
				withoutBottomLine
				multiline
				lastInput
				editable={false}
				uneditableMethod={moveToEditableInput}
				textAlign={'left'}
				fontSize={16}
				keyboardType={'url'}
				autoCapitalize={'none'}
				autoCorrect={false}
				textIsValid
				onIconPress={() => removeLink(index)}
				validateText={(text: string) => validateVacancyLinks(text)}
				onChangeText={(text: string) => { }}
			/>
		))
	}

	const linksLength = () => linksList.length

	const addNewLink = () => {
		if (linksLength() === 3 || linkText === '') return
		setLinksList([...linksList, linkText])
		setLinkText('')
	}

	const removeLink = (index: number) => {
		const links = [...linksList]
		delete links[index]
		setLinksList(links.filter((point) => point))
	}

	const skipScreen = () => {
		if (editMode) {
			addNewUnsavedFieldToEditContext({ links: [] })
			navigateBackwards()
		}
	}

	const getPlaceholder = () => {
		switch (linksLength()) {
			case 0: {
				return 'ex: www.corre.social'
			}
			case 1: {
				return 'link'
			}
			case 2: {
				return 'link'
			}
			default: return false
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.green2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'só inserir seu link abaixo'}
					highlightedWords={['link']}
				/>
				{
					skipScreen ? (
						<>
							<HorizontalSpacing />
							<SmallButton
								SvgIcon={TrashWhiteIcon}
								color={theme.red3}
								height={relativeScreenWidth(11)}
								relativeWidth={relativeScreenWidth(11)}
								svgScale={['60%', '60%']}
								onPress={skipScreen}
							/>
						</>
					)
						: <></>
				}
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
				justifyContent={linksLength() < 1 ? 'center' : 'space-around'}
			>
				<>
					{
						/* !keyboardOpened && */ renderPostLinksSaved()
					}
					{
						linksLength() < 3
						&& (
							<DefaultInput
								key={4}
								value={linkText}
								relativeWidth={'100%'}
								textInputRef={inputRefs.linkTextInput}
								defaultBackgroundColor={theme.white2}
								validBackgroundColor={theme.green1}
								withoutBottomLine
								lastInput
								multiline
								fontSize={16}
								onIconPress={!keyboardOpened ? () => { } : null}
								iconPosition={'left'}
								textAlignVertical={'center'}
								textAlign={'center'}
								placeholder={getPlaceholder() || ''}
								keyboardType={'url'}
								autoCapitalize={'none'}
								autoCorrect={false}
								onPressKeyboardSubmit={addNewLink}
								validateText={(text: string) => false}
								onChangeText={(text: string) => setLinkText(text)}
							/>
						)
					}
				</>
				<ButtonsContainer>
					{
						(linksLength() > 0 && !keyboardOpened)
						&& (
							<PrimaryButton
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={() => saveLinks(linksList)}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container >
	)
}

export { PostLinks }
