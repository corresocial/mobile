import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import Check from '../../../assets/icons/check-white.svg'

import { InsertVacancyTitleScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'

function InsertVacancyTitle({ route, navigation }: InsertVacancyTitleScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [vacancyTitle, setVacancyTitle] = useState<string>(route.params?.initialValue || '')
	const [vacancyTitleIsValid, setVacancyTitleIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		vacancyTitleInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateVacancyTitle(vacancyTitle)
		setVacancyTitleIsValid(validation)
	}, [vacancyTitle, keyboardOpened])

	const validateVacancyTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveVacancyTitle = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: vacancyTitle })
			navigation.goBack()
			return
		}

		if (vacancyTitleIsValid) {
			setVacancyDataOnContext({ title: vacancyTitle })
			navigation.navigate('InsertVacancyDescription')
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.yellow2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'que vaga você vai anunciar?'}
					highlightedWords={['vaga']}
				>
					<ProgressBar
						range={5}
						value={1}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={vacancyTitle}
					relativeWidth={'100%'}
					textInputRef={inputRefs.vacancyTitleInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.yellow1}
					validBorderBottomColor={theme.yellow5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: assistente de mecânico.'}
					keyboardType={'default'}
					textIsValid={vacancyTitleIsValid && !keyboardOpened}
					validateText={(text: string) => validateVacancyTitle(text)}
					onChangeText={(text: string) => setVacancyTitle(text)}
				/>
				<ButtonsContainer>
					{
						vacancyTitleIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['40%', '25%']}
								onPress={saveVacancyTitle}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertVacancyTitle }
