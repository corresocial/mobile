import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import Check from '../../../assets/icons/check.svg'

import { InsertCultureTitleScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { LineInput } from '../../../components/LineInput'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertCultureTitle({ route, navigation }: InsertCultureTitleScreenProps) {
	const { cultureDataContext, setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [cultureTitle, setCultureTitle] = useState<string>(route.params?.initialValue || '')
	const [cultureTitleIsValid, setCultureTitleIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		cultureTitleInput: useRef<React.MutableRefObject<any>>(null),
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
		const validation = validateCultureTitle(cultureTitle)
		setCultureTitleIsValid(validation)
	}, [cultureTitle, keyboardOpened])

	const validateCultureTitle = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveCultureTitle = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ title: cultureTitle })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ title: cultureTitle })
		navigation.navigate('InsertCultureDescription')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	const thisPostIsArtistProfile = route.params?.cultureType === 'artistProfile' || cultureDataContext.cultureType === 'artistProfile'

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.blue2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						thisPostIsArtistProfile
							? 'que arte você cria?'
							: 'qual o nome do evento?'
					}
					highlightedWords={
						thisPostIsArtistProfile
							? ['arte']
							: ['nome']
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
					value={cultureTitle}
					relativeWidth={'100%'}
					textInputRef={inputRefs.cultureTitleInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.blue1}
					validBorderBottomColor={theme.blue5}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={
						thisPostIsArtistProfile
							? 'ex: componho músicas'
							: 'ex: bazar de livros'
					}
					keyboardType={'default'}
					textIsValid={cultureTitleIsValid && !keyboardOpened}
					validateText={(text: string) => validateCultureTitle(text)}
					onChangeText={(text: string) => setCultureTitle(text)}
				/>
				<ButtonsContainer>
					{
						cultureTitleIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveCultureTitle}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertCultureTitle }
