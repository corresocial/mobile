import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertCompanyDescriptionScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function InsertCompanyDescription({ route, navigation }: InsertCompanyDescriptionScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [companyDescription, setCompanyDescription] = useState<string>(route.params?.initialValue || '')
	const [companyDescriptionIsValid, setCompanyDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		companyDescriptionInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateCompanyDescription(companyDescription)
		setCompanyDescriptionIsValid(validation)
	}, [companyDescription, keyboardOpened])

	const validateCompanyDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCompanyDescription = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ companyDescription })
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({ companyDescription })
		navigation.navigate('SelectWorkplace')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.yellow2} barStyle={'dark-content'} />
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
					message={'boa! \n\nagora fala um pouco sobre a sua empresa'}
					highlightedWords={['fala', 'sobre', 'a', 'sua', 'empresa']}
				>
					<ProgressBar
						range={5}
						value={3}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={companyDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={3}
					textInputRef={inputRefs.companyDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.yellow1}
					validBorderBottomColor={theme.yellow5}
					multiline
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: simples descrição da empresa, há quanto tempo ela existe, area de atuação, etc...'}
					keyboardType={'default'}
					textIsValid={companyDescriptionIsValid && !keyboardOpened}
					validateText={(text: string) => validateCompanyDescription(text)}
					onChangeText={(text: string) => setCompanyDescription(text)}
				/>
				<ButtonsContainer>
					{
						companyDescriptionIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={saveCompanyDescription}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertCompanyDescription }
