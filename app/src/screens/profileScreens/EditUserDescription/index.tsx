import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { EditUserDescriptionScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'

function EditUserDescription({ route, navigation }: EditUserDescriptionScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [profileDescription, setProfileDescription] = useState<string>(route.params.userDescription)
	const [profileDescriptionIsValid, setProfileDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		profileDescriptionInput: useRef<TextInput>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const validation = validateProfileDescription(profileDescription)
		setProfileDescriptionIsValid(validation)
	}, [profileDescription, keyboardOpened])

	const validateProfileDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveUserDescription = async () => {
		addNewUnsavedFieldToEditContext({ description: profileDescription })
		navigation.goBack()
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(28)}
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.orange2}
			>
				{/* <BackButton onPress={() => navigation.goBack()} /> */}
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'edite a descrição do seu perfil'}
					highlightedWords={['descrição', 'perfil']}
				/>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={profileDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={2}
					textInputRef={inputRefs.profileDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.orange1}
					validBorderBottomColor={theme.orange5}
					multiline
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'ex: trabalho de mecânico, tenho 33 anos, etc...'}
					keyboardType={'default'}
					textIsValid={profileDescriptionIsValid && !keyboardOpened}
					validateText={(text: string) => validateProfileDescription(text)}
					onChangeText={(text: string) => setProfileDescription(text)}
				/>
				<ButtonsContainer>
					{
						!keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row'}
								color={theme.green3}
								label={'salvar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={saveUserDescription}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { EditUserDescription }
