import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Check from '../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertCultureDescriptionScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function InsertCultureDescription({ route, navigation }: InsertCultureDescriptionScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [cultureDescription, setCultureDescription] = useState<string>(route.params?.initialValue || '')
	const [cultureDescriptionIsValid, setCultureDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		cultureDescriptionInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateCultureDescription(cultureDescription)
		setCultureDescriptionIsValid(validation)
	}, [cultureDescription, keyboardOpened])

	const validateCultureDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCultureDescription = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: cultureDescription })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ description: cultureDescription })
		navigation.navigate('InsertCulturePicture')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	const thisPostIsArtistProfile = route.params?.cultureType === 'artistProfile' || cultureDataContext.cultureType === 'artistProfile'

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(28)}
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.blue2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						thisPostIsArtistProfile
							? 'fala um pouco \nsobre a sua arte'
							: 'fala um pouco \nsobre esse role'
					}
					highlightedWords={
						thisPostIsArtistProfile
							? ['fala', 'sua', 'arte']
							: ['fala', 'esse', 'role']
					}
				>
					<ProgressBar
						range={thisPostIsArtistProfile ? 3 : 5}
						value={1}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={cultureDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={3}
					textInputRef={inputRefs.cultureDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.blue1}
					validBorderBottomColor={theme.blue5}
					multiline
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={
						thisPostIsArtistProfile
							? 'ex: o que você faz, qual o seu estilo, há quanto tempo você faz, se faz sozinho ou em grupo, etc.'
							: 'ex: vai ter muita gente, qual o objetivo desse role, se precisa levar algo'
					}
					keyboardType={'default'}
					textIsValid={cultureDescriptionIsValid && !keyboardOpened}
					validateText={(text: string) => validateCultureDescription(text)}
					onChangeText={(text: string) => setCultureDescription(text)}
				/>
				<ButtonsContainer>
					{
						cultureDescriptionIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveCultureDescription}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertCultureDescription }
