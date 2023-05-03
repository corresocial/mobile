import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { InsertVacancyImportantPointsScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'
import { SkipButton } from '../../../components/_buttons/SkipButton'

function InsertVacancyImportantPoints({ navigation }: InsertVacancyImportantPointsScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const [importantPointText, setImportantPointText] = useState('')
	const [importantPointsList, setImportantPointsList] = useState<string[]>([])
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		inputCards: [
			useRef<React.MutableRefObject<any>>(null),
			useRef<React.MutableRefObject<any>>(null),
			useRef<React.MutableRefObject<any>>(null)
		],
		importantPointTextInput: useRef<React.MutableRefObject<any>>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
	}, [importantPointText, keyboardOpened])

	const validateVacancyImportantPoints = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const renderVacanciesImportantPointsSaved = () => {
		if (!importantPointsLength()) return null
		return importantPointsList.map((currentImportantPoint, index) => (
			<LineInput
				key={uuid()}
				value={currentImportantPoint}
				relativeWidth={'100%'}
				textInputRef={inputRefs.inputCards[index]}
				defaultBackgroundColor={theme.white2}
				defaultBorderBottomColor={theme.black4}
				validBackgroundColor={theme.yellow1}
				validBorderBottomColor={theme.yellow5}
				invalidBackgroundColor={theme.red1}
				invalidBorderBottomColor={theme.red5}
				maxLength={100}
				lastInput
				editable={false}
				textAlign={'left'}
				fontSize={16}
				keyboardType={'default'}
				textIsValid={true && !keyboardOpened}
				onIconPress={() => removeImportantPoint(index)}
				validateText={(text: string) => validateVacancyImportantPoints(text)}
				onChangeText={(text: string) => { }}/* editImportantPoint(text, index) In case edit cardImportantPoint */
			/>
		))
	}

	const importantPointsLength = () => importantPointsList.length

	const addNewImportantPoint = () => {
		if (importantPointsLength() === 3 || importantPointText === '') return
		setImportantPointsList([...importantPointsList, importantPointText])
		setImportantPointText('')
	}
	/*
		const editImportantPoint = (point: string, index: number) => {
			const importantPoints = [...importantPointsList]
			importantPoints[index] = point
			setImportantPointsList(importantPoints)
		} */

	const removeImportantPoint = (index: number) => {
		const importantPoints = [...importantPointsList]
		delete importantPoints[index]
		setImportantPointsList(importantPoints.filter((point) => point))
	}

	const saveVacancyImportantPoints = () => {
		setVacancyDataOnContext({ importantPoints: importantPointsList })
		navigation.navigate('VacancyReview')
	}

	const skipScreen = () => navigation.navigate('VacancyReview')

	const getPlaceholder = () => {
		switch (importantPointsLength()) {
			case 0: {
				return '+ coisas importantes sobre você ou a vaga'
			}
			case 1: {
				return '+ segundo ponto'
			}
			case 2: {
				return '+ terceiro ponto'
			}
			default: return false
		}
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.yellow2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'quer adicionar até 3 pontos importantes?'}
					highlightedWords={['adicionar', 'até', '3', 'pontos', 'importantes']}
				>
					<ProgressBar
						value={5}
						range={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={importantPointsLength() < 1 ? 'center' : 'space-around'}
			>
				<>
					{
						/* !keyboardOpened && */ renderVacanciesImportantPointsSaved()
					}
					{
						importantPointsLength() < 3
						&& (
							<LineInput
								key={4}
								value={importantPointText}
								relativeWidth={'100%'}
								textInputRef={inputRefs.importantPointTextInput}
								defaultBackgroundColor={theme.white2}
								defaultBorderBottomColor={theme.black4}
								validBackgroundColor={theme.yellow1}
								validBorderBottomColor={theme.yellow5}
								invalidBackgroundColor={theme.red1}
								invalidBorderBottomColor={theme.red5}
								maxLength={100}
								multiline={importantPointsList.length === 0}
								lastInput
								textAlign={'left'}
								fontSize={16}
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
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={saveVacancyImportantPoints}
							/>
						)
					}
				</ButtonsContainer>
				{
					(importantPointsLength() < 1 && !keyboardOpened)
						? (
							<SkipButton
								customText={'pular'}
								customHighlight={['pular']}
								onPress={skipScreen}
							/>
						)
						: <></>
				}
			</FormContainer>
		</Container >
	)
}

export { InsertVacancyImportantPoints }
