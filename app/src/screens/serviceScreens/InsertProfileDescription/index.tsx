import { Keyboard, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Check from '../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertProfileDescriptionScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function InsertProfileDescription({ navigation }: InsertProfileDescriptionScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const [profileDescription, setProfileDescription] = useState<string>('')
	const [profileDescriptionIsValid, setProfileDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		profileDescriptionInput: useRef<React.MutableRefObject<any>>(null),
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

	const saveProfileDescription = () => {
		/* navigation.navigate('HomeTab' as any, {
			tourCompleted: true, showShareModal: true
		}) */
		if (profileDescriptionIsValid) {
			setServiceDataOnContext({
				profileDescription
			})
			navigation.navigate('InsertServiceName')
		}
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={screenHeight * 0.28}
				relativeHeight={'26%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'escreva uma descrição para o seu perfil'}
					highlightedWords={['descrição', 'seu', 'perfil']}
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
					value={profileDescription}
					relativeWidth={'100%'}
					initialNumberOfLines={2}
					textInputRef={inputRefs.profileDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.purple1}
					validBorderBottomColor={theme.purple5}
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
						profileDescriptionIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={Check}
								svgIconScale={['30%', '15%']}
								onPress={saveProfileDescription}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertProfileDescription }
