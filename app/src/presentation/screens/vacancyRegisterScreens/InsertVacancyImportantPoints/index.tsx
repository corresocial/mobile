import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'
import uuid from 'react-uuid'

import { EditContext } from '@contexts/EditContext'

import { InsertVacancyImportantPointsScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

function InsertVacancyImportantPoints({ route, navigation }: InsertVacancyImportantPointsScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [importantPointText, setImportantPointText] = useState('')
	const [importantPointsList, setImportantPointsList] = useState<string[]>(route.params?.initialValue || [])
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		inputCards: [
			useRef<TextInput>(null),
			useRef<TextInput>(null),
			useRef<TextInput>(null)
		],
		importantPointTextInput: useRef<TextInput>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (Platform.OS === 'android') removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validateVacancyImportantPoints = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const moveToEditableInput = (text: string) => {
		setImportantPointText(text)
	}

	const renderVacanciesImportantPointsSaved = () => {
		if (!importantPointsLength() || keyboardOpened) return null
		return importantPointsList.map((currentImportantPoint, index) => (
			<DefaultInput
				key={uuid()}
				value={currentImportantPoint}
				relativeWidth={'100%'}
				textInputRef={inputRefs.inputCards[index]}
				defaultBackgroundColor={theme.colors.white[2]}
				validBackgroundColor={theme.colors.green[1]}
				withoutBottomLine
				multiline
				lastInput
				editable={false}
				uneditableMethod={moveToEditableInput}
				textAlign={'left'}
				fontSize={16}
				keyboardType={'default'}
				textIsValid
				onIconPress={() => removeImportantPoint(index)}
				validateText={(text: string) => validateVacancyImportantPoints(text)}
				onChangeText={(text: string) => { }}
			/>
		))
	}

	const importantPointsLength = () => importantPointsList.length

	const addNewImportantPoint = () => {
		if (importantPointsLength() === 3 || importantPointText === '') return
		setImportantPointsList([...importantPointsList, importantPointText])
		setImportantPointText('')
	}

	const removeImportantPoint = (index: number) => {
		const importantPoints = [...importantPointsList]
		delete importantPoints[index]
		setImportantPointsList(importantPoints.filter((point) => point))
	}

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ importantPoints: [] })
			navigation.goBack()
		}
	}

	const saveVacancyImportantPoints = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ importantPoints: importantPointsList })
			navigation.goBack()
		}
	}

	const getPlaceholder = () => {
		switch (importantPointsLength()) {
			case 0: {
				return 'pontos importantes'
			}
			case 1: {
				return 'segundo ponto'
			}
			case 2: {
				return 'terceiro ponto'
			}
			default: return false
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.colors.green[2]}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					fontSize={16}
					message={'quer adicionar até 3 pontos importantes?'}
					highlightedWords={['adicionar', 'até', '3', 'pontos', 'importantes']}
				/>
				{
					skipScreen ? (
						<>
							<HorizontalSpacing />
							<SmallButton
								SvgIcon={TrashWhiteIcon}
								color={theme.colors.red[3]}
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
				backgroundColor={theme.colors.white[3]}
				justifyContent={importantPointsLength() < 1 ? 'center' : 'space-around'}
			>
				<>
					{
						renderVacanciesImportantPointsSaved()
					}
					{
						importantPointsLength() < 3
						&& (
							<DefaultInput
								key={4}
								value={importantPointText}
								relativeWidth={'100%'}
								textInputRef={inputRefs.importantPointTextInput}
								defaultBackgroundColor={theme.colors.white[2]}
								validBackgroundColor={theme.colors.green[1]}
								withoutBottomLine
								lastInput
								multiline
								fontSize={16}
								onIconPress={!keyboardOpened ? () => { } : null}
								iconPosition={'left'}
								textAlignVertical={'center'}
								textAlign={'center'}
								placeholder={getPlaceholder() || ''}
								keyboardType={'default'}
								onPressKeyboardSubmit={addNewImportantPoint}
								validateText={(text: string) => false}
								onChangeText={(text: string) => setImportantPointText(text)}
							/>
						)
					}
				</>
				<ButtonsContainer>
					{
						(importantPointsLength() > 0 && !keyboardOpened)
						&& (
							<PrimaryButton
								color={theme.colors.green[3]}
								label={'continuar'}
								labelColor={theme.colors.white[3]}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={saveVacancyImportantPoints}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container >
	)
}

export { InsertVacancyImportantPoints }
