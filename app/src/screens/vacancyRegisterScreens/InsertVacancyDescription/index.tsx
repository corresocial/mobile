import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'
import Check from '@assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'

import { InsertVacancyDescriptionScreenProps } from '@routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '@contexts/VacancyContext'
import { EditContext } from '@contexts/EditContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { ProgressBar } from '@components/ProgressBar'
import { LineInput } from '@components/LineInput'
import { ButtonsContainer, Container } from './styles'

function InsertVacancyDescription({
	route,
	navigation,
}: InsertVacancyDescriptionScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [vacancyDescription, setVacancyDescription] = useState<string>(
		route.params?.initialValue || ''
	)
	const [vacancyDescriptionIsValid, setVacancyDescriptionIsValid] =		useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		vacancyDescriptionInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateVacancyDescription(vacancyDescription)
		setVacancyDescriptionIsValid(validation)
	}, [vacancyDescription, keyboardOpened])

	const validateVacancyDescription = (text: string) => {
		const isValid = text.trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveVacancyDescription = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				description: vacancyDescription,
			})
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ description: vacancyDescription })
		navigation.navigate('InsertVacancyQuestions')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar
				backgroundColor={theme.yellow2}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(28)}
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.yellow2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'escreva uma descrição sobre a vaga'}
					highlightedWords={['descrição', 'vaga']}
				>
					<ProgressBar range={5} value={1} />
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={vacancyDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={2}
					textInputRef={inputRefs.vacancyDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.yellow1}
					validBorderBottomColor={theme.yellow5}
					multiline
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={
						'ex: descreva a vaga, atividades, benefícios, etc...'
					}
					keyboardType={'default'}
					textIsValid={vacancyDescriptionIsValid && !keyboardOpened}
					validateText={(text: string) => validateVacancyDescription(text)}
					onChangeText={(text: string) => setVacancyDescription(text)}
				/>
				<ButtonsContainer>
					{vacancyDescriptionIsValid && !keyboardOpened && (
						<PrimaryButton
							flexDirection={'row-reverse'}
							color={theme.green3}
							label={'continuar'}
							labelColor={theme.white3}
							SvgIcon={Check}
							svgIconScale={['30%', '15%']}
							onPress={saveVacancyDescription}
						/>
					)}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertVacancyDescription }
